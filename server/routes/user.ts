import express, { Request, Response } from "express";
import { supabase } from "../database/index.js";
import { TABLE_NAME } from "../util/constant.js";
import { AuthRequest, middleware } from "../util/middleware.js";

const router = express.Router();

// GET /user/profile - Fetch all user details for editing
router.get("/profile", middleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;

    // Fetch all user details
    const { data, error } = await supabase
      .from(TABLE_NAME.USERS)
      .select(
        "id, mobilenumber, firstname, lastname, middlename, is_admin, location, notifications_enabled",
      )
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({
        status: false,
        error: "Failed to fetch user profile",
      });
    }

    if (!data) {
      return res.status(404).json({ status: false, error: "User not found" });
    }

    return res.status(200).json({
      status: true,
      data: {
        id: data.id,
        mobileNumber: data.mobilenumber,
        firstName: data.firstname,
        lastName: data.lastname,
        middleName: data.middlename,
        isadmin: data.is_admin,
        location: data.location,
        notificationsEnabled: data.notifications_enabled,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
});

// PATCH /user/profile - Update user profile details
router.patch("/profile", middleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const { firstName, lastName, middleName, mobileNumber, location }: any =
      req.body;

    // Build update object with only provided fields
    const updateData: any = {};

    if (firstName !== undefined) updateData.firstname = firstName;
    if (lastName !== undefined) updateData.lastname = lastName;
    if (middleName !== undefined) updateData.middlename = middleName;
    if (mobileNumber !== undefined) updateData.mobilenumber = mobileNumber;
    if (location !== undefined) updateData.location = location;

    // Check if there are any fields to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: false,
        error: "No fields provided to update",
      });
    }

    // Update the user's profile
    const { data, error } = await supabase
      .from(TABLE_NAME.USERS)
      .update(updateData)
      .eq("id", userId)
      .select(
        "id, mobilenumber, firstname, lastname, middlename, is_admin, location",
      )
      .single();

    if (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({
        status: false,
        error: "Failed to update user profile",
      });
    }

    if (!data) {
      return res.status(404).json({ status: false, error: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: {
        id: data.id,
        mobileNumber: data.mobilenumber,
        firstName: data.firstname,
        lastName: data.lastname,
        middleName: data.middlename,
        isadmin: data.is_admin,
        location: data.location,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
});

// POST /user/push-token - register/update this user's Expo push token
router.post("/push-token", middleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const { pushToken } = req.body as { pushToken?: string };

    if (!pushToken || typeof pushToken !== "string") {
      return res
        .status(400)
        .json({ status: false, error: "pushToken is required" });
    }

    const { error } = await supabase
      .from(TABLE_NAME.USERS)
      .update({ push_token: pushToken })
      .eq("id", userId);

    if (error) throw new Error(error.message);

    return res.status(200).json({ status: true });
  } catch (error: any) {
    console.error("Error saving push token:", error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Internal server error" });
  }
});

// PATCH /user/notifications - turn notifications on/off for this user
router.patch(
  "/notifications",
  middleware,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthRequest).user.id;
      const { enabled } = req.body as { enabled?: boolean };

      if (typeof enabled !== "boolean") {
        return res
          .status(400)
          .json({ status: false, error: "enabled (boolean) is required" });
      }

      const { error } = await supabase
        .from(TABLE_NAME.USERS)
        .update({ notifications_enabled: enabled })
        .eq("id", userId);

      if (error) throw new Error(error.message);

      return res.status(200).json({ status: true, notificationsEnabled: enabled });
    } catch (error: any) {
      console.error("Error updating notifications flag:", error);
      return res.status(500).json({
        status: false,
        error: error.message || "Internal server error",
      });
    }
  },
);

export default router;
