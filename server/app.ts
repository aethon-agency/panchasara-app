import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import eventRoutes from "./routes/event.js";
import announcementRoutes from "./routes/announcement.js";
import galleryRoutes from "./routes/gallery.js";
import donationRoutes from "./routes/donation.js";

import { checkDBConnected } from "./database/index.js";

import contactRoutes from "./routes/contact.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRoutes);
app.use("/announcements", announcementRoutes);
app.use("/galleries", galleryRoutes);
app.use("/contacts", contactRoutes);
app.use("/donations", donationRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await checkDBConnected();
    res.json({
      success: result,
      message: "Database connection test passed!",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default app;
