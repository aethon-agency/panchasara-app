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
    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, date",
      });
    }

    if (startTime && !isValidTime(startTime)) {
      return res.status(400).json({
        success: false,
        message: "Invalid start time format. Use HH:mm",
      });
    }

    if (endTime && !isValidTime(endTime)) {
      return res.status(400).json({
        success: false,
        message: "Invalid end time format. Use HH:mm",
      });
    }

    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const { data, error } = await supabase
      .from("poonams")
      .insert([
        {
          title,
          event_date: date,
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
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export default router;
