import { Image } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system/legacy";
import api from "./api";
import { SelectedImage } from "../constants/types";

type UploadFolder = "gallery" | "banner" | "profile";

// Size tuning. We reduce file size by downscaling resolution only (phone photos
// are often 4000px+); the encode stays at FULL quality (1.0 = no lossy JPEG
// quality reduction), so pixels aren't degraded — the image just has fewer of
// them, which is imperceptible on phone screens.
const MAX_DIMENSION = 2048; // longest edge in px
const JPEG_QUALITY = 1; // 0..1 — 1 = maximum/full quality, no lossy reduction

interface PresignResponse {
  success: boolean;
  uploadUrl: string;
  publicUrl: string;
  key: string;
  maxSize: number;
  expiresIn: number;
  error?: string;
}

const getImageSize = (uri: string): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });

// Compress + resize on the device so we upload small, storage-cheap files
// without a visible quality drop. Only downscales when the longest edge
// exceeds the cap (never upscales), and resizes the correct axis for the
// image's orientation. Returns a jpeg uri.
const compressImage = async (uri: string): Promise<string> => {
  let actions: ImageManipulator.Action[] = [];
  try {
    const { width, height } = await getImageSize(uri);
    if (Math.max(width, height) > MAX_DIMENSION) {
      actions =
        width >= height
          ? [{ resize: { width: MAX_DIMENSION } }]
          : [{ resize: { height: MAX_DIMENSION } }];
    }
  } catch {
    // Couldn't read dimensions — fall back to a width cap.
    actions = [{ resize: { width: MAX_DIMENSION } }];
  }

  const result = await ImageManipulator.manipulateAsync(uri, actions, {
    compress: JPEG_QUALITY,
    format: ImageManipulator.SaveFormat.JPEG,
  });
  return result.uri;
};

export interface UploadedMedia {
  url: string;
  key: string;
}

// Compress a picked image, get a presigned URL, upload the bytes straight to
// R2 (never through our API), then have the server verify it. Returns the
// public URL and the R2 key (store the key if you need to delete it later).
export const uploadImageAsset = async (
  uri: string,
  folder: UploadFolder,
  prefix?: string,
): Promise<UploadedMedia> => {
  const compressedUri = await compressImage(uri);
  const contentType = "image/jpeg";

  const presign = await api.post<PresignResponse>("/media/presign", {
    folder,
    contentType,
    prefix,
  });

  if (!presign?.success || !presign.uploadUrl) {
    throw new Error(presign?.error || "Failed to get upload URL");
  }

  // Upload the local file straight to R2. uploadAsync streams the file as
  // raw bytes — reliable in React Native, unlike fetch(uri).blob() which can
  // send a 0-byte/malformed body.
  const putResponse = await FileSystem.uploadAsync(
    presign.uploadUrl,
    compressedUri,
    {
      httpMethod: "PUT",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: { "Content-Type": contentType },
    },
  );

  if (putResponse.status < 200 || putResponse.status >= 300) {
    throw new Error(`Upload failed (${putResponse.status})`);
  }

  // Ask the server to HEAD the object before we trust the URL.
  const confirm = await api.post<{ success: boolean; error?: string }>(
    "/media/confirm",
    { key: presign.key, contentType },
  );
  if (!confirm?.success) {
    throw new Error(confirm?.error || "Upload verification failed");
  }

  return { url: presign.publicUrl, key: presign.key };
};

/**
 * Compress and upload a list of picked images directly to R2 via presigned
 * URLs. Returns the public URLs to store in the gallery record.
 * onProgress fires after each file completes.
 */
export const uploadImages = async (
  images: SelectedImage[],
  folder: UploadFolder,
  prefix?: string,
  onProgress?: (current: number, total: number) => void,
): Promise<string[]> => {
  const urls: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const { url } = await uploadImageAsset(images[i].uri, folder, prefix);
    urls.push(url);
    onProgress?.(i + 1, images.length);
  }
  return urls;
};
