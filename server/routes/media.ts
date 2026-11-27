import express, { Request, Response } from "express";
import { AuthRequest, middleware } from "../util/middleware.js";
import {
  ALLOWED_FOLDERS,
  UploadFolder,
  createUploadUrl,
  isAllowedContentType,
  isR2Configured,
  maxSizeFor,
  verifyUpload,
} from "../services/r2.js";

const router = express.Router();

/**
 * POST /media/presign
 * Body: { folder, contentType, prefix? }
 * Returns a short-lived URL the client uses to PUT the file directly to R2.
 * JWT required — the server, not the client, decides the final object key.
 */
router.post("/presign", middleware, async (req: Request, res: Response) => {
  try {
    if (!isR2Configured()) {
      return res.status(503).json({
        success: false,
        error: "Storage is not configured on the server",
      });
    }

    const userId = (req as AuthRequest).user.id;
    const { folder, contentType, prefix } = req.body as {
      folder?: string;
      contentType?: string;
      prefix?: string;
    };

    if (!folder || !contentType) {
      return res.status(400).json({
        success: false,
        error: "folder and contentType are required",
      });
    }

    if (!ALLOWED_FOLDERS.includes(folder as UploadFolder)) {
      return res.status(400).json({
        success: false,
        error: `Invalid folder. Allowed: ${ALLOWED_FOLDERS.join(", ")}`,
      });
    }

    if (!isAllowedContentType(contentType)) {
      return res.status(400).json({
        success: false,
        error: `Unsupported file type: ${contentType}`,
      });
    }

    const result = await createUploadUrl({
      userId,
      folder: folder as UploadFolder,
      contentType,
      prefix,
    });

    return res.json({
      success: true,
      ...result,
      maxSize: maxSizeFor(contentType),
      expiresIn: 300,
    });
  } catch (error: any) {
    console.error("Error creating presigned URL:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to create upload URL",
    });
  }
});

/**
 * POST /media/confirm
 * Body: { key, contentType }
 * Verifies the object actually landed in R2 and respects the size cap, so the
 * URL is only trusted after the server has HEAD-checked it. The uploaded key
 * must belong to the calling user (prefix "<folder>/<userId>/").
 */
router.post("/confirm", middleware, async (req: Request, res: Response) => {
  try {
    if (!isR2Configured()) {
      return res.status(503).json({
        success: false,
        error: "Storage is not configured on the server",
      });
    }

    const userId = (req as AuthRequest).user.id;
    const { key, contentType } = req.body as {
      key?: string;
      contentType?: string;
    };

    if (!key || !contentType) {
      return res.status(400).json({
        success: false,
        error: "key and contentType are required",
      });
    }

    // Validate the key shape. Reject traversal and unknown folders. Profile
    // objects are namespaced per user, so enforce ownership there.
    const segments = key.split("/");
    const folder = segments[0] as UploadFolder;
    if (
      segments.length < 2 ||
      key.includes("..") ||
      !ALLOWED_FOLDERS.includes(folder)
    ) {
      return res.status(400).json({ success: false, error: "Invalid key" });
    }
    if (folder === "profile" && segments[1] !== userId) {
      return res.status(403).json({
        success: false,
        error: "Key does not belong to this user",
      });
    }

    const verified = await verifyUpload(key, contentType);
    if (!verified) {
      return res.status(422).json({
        success: false,
        error: "Upload not found or exceeds the allowed size",
      });
    }

    return res.json({ success: true, verified: true });
  } catch (error: any) {
    console.error("Error confirming upload:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to confirm upload",
    });
  }
});

export default router;
