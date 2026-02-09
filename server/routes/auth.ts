import express, { Request, Response } from "express";
import { supabase } from "../database/index.js";
import { COLUMN_NAME, TABLE_NAME } from "../util/constant.js";
import { sendOTP, verifyOTP } from "../services/otp.js";
import { generateToken } from "../services/jwt.js";
import { SigninRequest, SignupRequest, User } from "../types/auth.js";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body as SigninRequest;

    if (!mobileNumber) {
      res.status(400).json({
        success: false,
        error: "Mobile number is required",
      });
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      res.status(400).json({
        success: false,
        error: "Invalid mobile number format. Must be 10 digits.",
      });
      return;
    }

    // Check if user exists
    const { data: users, error } = await supabase
      .from(TABLE_NAME.USERS)
      .select("*")
      .eq(COLUMN_NAME.USERS.MOBILE_NUMBER, mobileNumber)
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    if (!users || users.length === 0) {
      res.json({
        success: true,
        newUser: true,
        message: "Please Register User First",
      });
      return;
    }

    const requestId: string | null = await sendOTP(mobileNumber);

    if (requestId) {
      res.json({
        success: true,
        hash: requestId,
        message: "OTP sent successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send OTP via MSG91",
      });
    }
  } catch (error: any) {
    console.error("Error in signin:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to send OTP",
    });
  }
});

router.post("/verify-otp", async (req: Request, res: Response) => {
  try {
    const { mobileNumber, otp, hash } = req.body;

    if (!otp || !hash || !mobileNumber) {
      return res.status(400).json({
        success: false,
        error: "Missing fields",
      });
    }

    const { data: users, error } = await supabase
      .from(TABLE_NAME.USERS)
      .select("*")
      .eq(COLUMN_NAME.USERS.MOBILE_NUMBER, mobileNumber)
      .limit(1);

    if (error) throw new Error(error.message);

    if (users && users.length > 0) {
      const isValid = await verifyOTP(otp, hash);

      if (!isValid) {
        return res.status(200).json({
          success: false,
          message: "Invalid or expired OTP",
        });
      }

      const user = users[0];
      const token = generateToken(
        user.id,
        user[COLUMN_NAME.USERS.MOBILE_NUMBER],
      );
      return res.json({ success: true, token, user });
    }

    return res.json({
      success: true,
      newUser: true,
      message: "Please Register User First",
    });
  } catch (error: any) {
    console.error("Error in verify-otp:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to verify OTP",
    });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { mobileNumber, firstName, middleName, lastName } =
      req.body as SignupRequest;

    if (!mobileNumber || !firstName || !middleName || !lastName) {
      return res.status(400).json({
        success: false,
        error: "Required fields: mobileNumber, firstName, middleName, lastName",
      });
    }

    const { data: users, error: fetchError } = await supabase
      .from(TABLE_NAME.USERS)
      .select("*")
      .eq(COLUMN_NAME.USERS.MOBILE_NUMBER, mobileNumber)
      .limit(1);

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    if (users && users.length > 0) {
      return res.status(409).json({
        success: false,
        error: "User already registered",
        isRegistered: true,
      });
    }

    const { data: newUsers, error: insertError } = await supabase
      .from(TABLE_NAME.USERS)
      .insert([
        {
          mobilenumber: mobileNumber,
          firstname: firstName,
          middlename: middleName,
          lastname: lastName,
        },
      ])
      .select();

    if (insertError) {
      throw new Error(insertError.message);
    }

    if (!newUsers || newUsers.length === 0) {
      throw new Error("Failed to create user");
    }

    const requestId: string | null = await sendOTP(mobileNumber);

    if (requestId) {
      res.status(201).json({
        success: true,
        hash: requestId,
        message: "User registered. OTP sent.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "User registered but failed to send OTP.",
      });
    }
  } catch (error: any) {
    console.error("Error in signup:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Signup failed",
    });
  }
});

export default router;
