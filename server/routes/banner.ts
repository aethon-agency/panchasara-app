import express, { Request, Response } from "express";
import { supabase } from "../database/index.js";
import { TABLE_NAME } from "../util/constant.js";
import { middleware } from "../util/middleware.js";
import { deleteObject } from "../services/r2.js";

const router = express.Router();

// GET / - list banners in display order (public, used by the home carousel)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME.BANNERS)
      .select("*")
      .order("position", { ascending: true });

    if (error) throw new Error(error.message);
    res.json({ success: true, data: data || [] });
  } catch (error: any) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch banners",
    });
  }
});

// POST / - add a banner (image already uploaded to R2 by the client)
router.post("/", middleware, async (req: Request, res: Response) => {
  try {
    const { imageUrl, key } = req.body as { imageUrl?: string; key?: string };
    if (!imageUrl || !key) {
      return res
        .status(400)
        .json({ success: false, message: "imageUrl and key are required" });
    }

    // Append to the end: position = current max + 1.
    const { data: last } = await supabase
      .from(TABLE_NAME.BANNERS)
      .select("position")
      .order("position", { ascending: false })
      .limit(1);
    const nextPosition = (last && last[0]?.position ? last[0].position : 0) + 1;

    const { data, error } = await supabase
      .from(TABLE_NAME.BANNERS)
      .insert([{ image_url: imageUrl, storage_key: key, position: nextPosition }])
      .select();

    if (error) throw new Error(error.message);
    res.status(201).json({ success: true, data: data?.[0] });
  } catch (error: any) {
    console.error("Error adding banner:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add banner",
    });
  }
});

// PUT /:id - replace a banner's image. Deletes the old file from R2.
router.put("/:id", middleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imageUrl, key } = req.body as { imageUrl?: string; key?: string };
    if (!imageUrl || !key) {
      return res
        .status(400)
        .json({ success: false, message: "imageUrl and key are required" });
    }

    const { data: existing, error: fetchError } = await supabase
      .from(TABLE_NAME.BANNERS)
      .select("storage_key")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError.message);

    const { data, error } = await supabase
      .from(TABLE_NAME.BANNERS)
      .update({ image_url: imageUrl, storage_key: key })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);

    // Remove the previous file so the bucket doesn't accumulate orphans.
    if (existing?.storage_key && existing.storage_key !== key) {
      await deleteObject(existing.storage_key);
    }

    res.json({ success: true, data: data?.[0] });
  } catch (error: any) {
    console.error("Error updating banner:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update banner",
    });
  }
});

// DELETE /:id - remove a banner and its R2 file
router.delete("/:id", middleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: existing, error: fetchError } = await supabase
      .from(TABLE_NAME.BANNERS)
      .select("storage_key")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError.message);

    const { error } = await supabase
      .from(TABLE_NAME.BANNERS)
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);

    if (existing?.storage_key) {
      await deleteObject(existing.storage_key);
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting banner:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete banner",
    });
  }
});

// POST /reorder - persist a new display order. Body: { ids: number[] }
router.post("/reorder", middleware, async (req: Request, res: Response) => {
  try {
    const { ids } = req.body as { ids?: number[] };
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "ids array is required" });
    }

    // Position is 1-based and matches the array order.
    await Promise.all(
      ids.map((id, index) =>
        supabase
          .from(TABLE_NAME.BANNERS)
          .update({ position: index + 1 })
          .eq("id", id),
      ),
    );

    res.json({ success: true });
  } catch (error: any) {
    console.error("Error reordering banners:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to reorder banners",
    });
  }
});

export default router;
