import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import eventRoutes from "./routes/event.js";

import { checkDBConnected } from "./database/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRoutes);

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
