import express from "express";
import { supabase } from "../database/index.js";

const router = express.Router();

// POST / - Create a new announcement
router.post("/", async (req, res) => {
  try {
    const { title, contact_number, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 10 characters",
      });
    }

    const { data, error } = await supabase
      .from("announcements")
      .insert([
        {
          title,
          contact_number: contact_number || null,
          description: description || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

// GET / - Fetch all announcements
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch announcements",
    });
  }
});

export default router;
