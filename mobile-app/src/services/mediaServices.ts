import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system/legacy";
import api from "./api";
import { SelectedImage } from "../constants/types";

type UploadFolder = "gallery" | "banner" | "profile";

interface PresignResponse {
  success: boolean;
  uploadUrl: string;
  publicUrl: string;
  key: string;
  maxSize: number;
  expiresIn: number;
  error?: string;
}

// Compress + resize on the device so we upload small files and stay under the
// server's size cap. Returns a jpeg uri.
const compressImage = async (uri: string): Promise<string> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1600 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
  );
  return result.uri;
};

// Ask the server for a presigned URL, then PUT the bytes straight to R2.
// The file never passes through our API server.
const uploadOne = async (
  uri: string,
  folder: UploadFolder,
  prefix?: string,
): Promise<string> => {
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
  const putResponse = await FileSystem.uploadAsync(presign.uploadUrl, uri, {
    httpMethod: "PUT",
    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    headers: { "Content-Type": contentType },
  });

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

  return presign.publicUrl;
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
    const compressedUri = await compressImage(images[i].uri);
    const url = await uploadOne(compressedUri, folder, prefix);
    urls.push(url);
    onProgress?.(i + 1, images.length);
  }
  return urls;
};
