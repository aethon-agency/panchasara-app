import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const R2_BUCKET = process.env.R2_BUCKET || "";
const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL || "").replace(/\/+$/, "");

export const r2 = new S3Client({
  region: process.env.R2_REGION || "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

// Folders the client is allowed to upload into. The server always picks the
// final key, so a client can never overwrite another user's files.
export const ALLOWED_FOLDERS = ["gallery", "banner", "profile"] as const;
export type UploadFolder = (typeof ALLOWED_FOLDERS)[number];

// Allowed MIME types and their size caps (bytes).
const CONTENT_RULES: Record<string, number> = {
  "image/jpeg": 5 * 1024 * 1024,
  "image/png": 5 * 1024 * 1024,
  "image/webp": 5 * 1024 * 1024,
  "video/mp4": 50 * 1024 * 1024,
};

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
};

export const isR2Configured = (): boolean =>
  Boolean(
    R2_BUCKET &&
      process.env.R2_ENDPOINT &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      R2_PUBLIC_URL,
  );

export const isAllowedContentType = (contentType: string): boolean =>
  Object.prototype.hasOwnProperty.call(CONTENT_RULES, contentType);

export const maxSizeFor = (contentType: string): number =>
  CONTENT_RULES[contentType] ?? 0;

interface PresignOptions {
  userId: string;
  folder: UploadFolder;
  contentType: string;
  prefix?: string; // optional sub-path, e.g. "2026/11"
}

/**
 * Create a short-lived presigned PUT URL. The client uploads the file bytes
 * straight to R2 with it — the bytes never pass through this server.
 */
export const createUploadUrl = async ({
  userId,
  folder,
  contentType,
  prefix,
}: PresignOptions) => {
  const ext = EXT_BY_TYPE[contentType] || "bin";
  const safePrefix = (prefix || "").replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 64);
  const id = randomUUID();

  // Structure keys so the bucket stays browseable as the app grows:
  //   gallery/{year}/{month}/{uuid}.ext  (shared albums, grouped by date)
  //   banner/{uuid}.ext                  (home banners)
  //   profile/{userId}/{uuid}.ext        (avatars, namespaced per user)
  let key: string;
  switch (folder) {
    case "profile":
      key = `profile/${userId}/${id}.${ext}`;
      break;
    case "banner":
      key = ["banner", safePrefix, `${id}.${ext}`].filter(Boolean).join("/");
      break;
    case "gallery":
    default:
      key = ["gallery", safePrefix, `${id}.${ext}`].filter(Boolean).join("/");
      break;
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 }); // 5 min
  const publicUrl = `${R2_PUBLIC_URL}/${key}`;

  return { uploadUrl, publicUrl, key };
};

/** Confirm an object exists and respects the size cap (defence in depth). */
export const verifyUpload = async (
  key: string,
  contentType: string,
): Promise<boolean> => {
  try {
    const head = await r2.send(
      new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }),
    );
    const max = maxSizeFor(contentType);
    if (max && head.ContentLength && head.ContentLength > max) return false;
    return true;
  } catch {
    return false;
  }
};

/** Delete an object by key (e.g. when a gallery is removed). */
export const deleteObject = async (key: string): Promise<boolean> => {
  try {
    await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch (error) {
    console.error("R2 delete failed:", error);
    return false;
  }
};
