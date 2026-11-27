import express, { Request, Response } from "express";
import { supabase } from "../database/index.js";

const router = express.Router();

// Compare two "x.y.z" version strings. Returns -1, 0, or 1.
const compareVersions = (a: string, b: string): number => {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const x = pa[i] || 0;
    const y = pb[i] || 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
};

/**
 * GET /app-version?platform=android&version=1.0.0
 * Tells the app whether it must update (installed < min_version), whether a
 * newer version exists, and where to get it.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const platform = String(req.query.platform || "android").toLowerCase();
    const current = String(req.query.version || "");

    const { data, error } = await supabase
      .from("app_version")
      .select("*")
      .eq("platform", platform === "ios" ? "ios" : "android")
      .single();

    if (error || !data) {
      // Fail open: if config is missing, never block the user.
      return res.json({
        success: true,
        forceUpdate: false,
        updateAvailable: false,
      });
    }

    const forceUpdate = current
      ? compareVersions(current, data.min_version) < 0
      : false;
    const updateAvailable = current
      ? compareVersions(current, data.latest_version) < 0
      : false;

    return res.json({
      success: true,
      platform: data.platform,
      latestVersion: data.latest_version,
      minVersion: data.min_version,
      storeUrl: data.store_url,
      forceUpdate,
      updateAvailable,
    });
  } catch (err: any) {
    console.error("Error checking app version:", err);
    // Fail open on unexpected errors so a check failure never bricks the app.
    return res.json({
      success: true,
      forceUpdate: false,
      updateAvailable: false,
    });
  }
});

export default router;
