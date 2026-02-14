import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { SelectedImage } from "../constants/types";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
);

export const uploadProfileImage = async (
  images: SelectedImage[],
  folder: string,
) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: "base64",
      });

      const arrayBuffer = decode(base64);
      const fileExt = image.uri.split(".").pop()?.toLowerCase() ?? "jpg";
      // Use the provided fileName or generate one if needed, but the folder is passed.
      // In add-gallery, fileName is generated. We should combine folder and fileName.
      const filePath = folder ? `${folder}/${image.fileName}` : image.fileName;
      const contentType = fileExt === "png" ? "image/png" : "image/jpeg";

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, arrayBuffer, {
          upsert: true,
          contentType,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);
      return data.publicUrl;
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

const BUCKET_NAME = "GALLERY";
