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

// POST /donations - Create a new donation
router.post("/", async (req: Request, res: Response) => {
  try {
    const { type, title, donor_name, amount, item_name, item_qty, date } =
      req.body;

    if (!type || !title || !donor_name || !date) {
      res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
      return;
    }

    // Parse date from DD-MM-YYYY
    const dateParts = date.split("-");
    const dbDate =
      dateParts.length === 3
        ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        : date;

    const { data, error } = await supabase
      .from(TABLE_NAME.DONATIONS)
      .insert([
        {
          type,
          title,
          donor_name,
          amount: amount ? parseFloat(amount) : null,
          item_name: item_name || null,
          item_qty: item_qty ? parseInt(item_qty) : null,
          donation_date: dbDate,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating donation:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create donation",
      });
      return;
    }

    res.status(201).json({
      success: true,
      data,
      message: "Donation added successfully",
    });
  } catch (error: any) {
    console.error("Error in creating donation:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

export default router;
