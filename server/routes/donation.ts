import express, { Request, Response } from "express";
import { supabase } from "../database/index.js";
import { TABLE_NAME } from "../util/constant.js";

const router = express.Router();

// GET /donations - Fetch all donations
router.get("/", async (req: Request, res: Response) => {
  try {
    const { data: donations, error } = await supabase
      .from(TABLE_NAME.DONATIONS)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch donations",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error: any) {
    console.error("Error in fetching donations:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

export default router;
