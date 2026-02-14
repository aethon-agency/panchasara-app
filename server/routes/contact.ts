import express, { Request, Response } from "express";
import { supabase } from "../database/index.js";
import { TABLE_NAME } from "../util/constant.js";

const router = express.Router();

// GET /contacts - Fetch all committee members
router.get("/", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME.CONTACTUS)
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({
        status: false,
        error: "Failed to fetch contacts",
      });
    }

    return res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
});

export default router;
