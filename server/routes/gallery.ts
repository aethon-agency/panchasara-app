import express from "express";
import { supabase } from "../database/index.js";

const router = express.Router();

// POST / - Create a new gallery entry
router.post("/", async (req, res) => {
  try {
    const { title, month, year, images } = req.body;

    if (!title || !month || !year || !images || !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: "Title, month, year, and images array are required",
      });
    }

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const { data, error } = await supabase
      .from("galleries")
      .insert([
        {
          title,
          month: parseInt(month),
          year: parseInt(year),
          images,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error("Error creating gallery:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

// GET / - Fetch all galleries
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .order("year", { ascending: false })
      .order("month", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching galleries:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch galleries",
    });
  }
});

export default router;
