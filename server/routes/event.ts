import express from "express";
import { supabase } from "../database/index.js";

const router = express.Router();

// Helper to validate time format HH:mm
const isValidTime = (time: string) =>
  /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

router.post("/poonam", async (req, res) => {
  try {
    const {
      title,
      date,
      startTime,
      endTime,
      organizer,
      description,
      location,
    } = req.body;

    // Basic validation
    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, date, startTime, endTime",
      });
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time format. Use HH:mm",
      });
    }

    if (endTime <= startTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be greater than start time",
      });
    }

    // Parse date from DD-MM-YYYY
    const parts = date.split("-");
    const dateObj = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0]),
    );
    const dayOfWeek = dateObj
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const dbDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const { data, error } = await supabase
      .from("poonams")
      .insert([
        {
          title,
          event_date: dbDate,
          day: dayOfWeek,
          start_time: startTime || null,
          end_time: endTime || null, // Optional
          organizer_name: organizer || null,
          description: description || null,
          location: location || "ભવાની માં મઢ - ભાડુકા",
          type: "poonam", // Ensuring type is set
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error("Error creating poonam:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

// GET / - Fetch all poonams
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("poonams")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch events",
    });
  }
});

// GET /:id - Fetch single poonam by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("poonams")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching event details:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch event details",
    });
  }
});

export default router;
