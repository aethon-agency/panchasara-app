import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.js";

export interface UserPayload {
  id: string;
  mobileNumber: string;
}

export interface AuthRequest extends Request {
  user: UserPayload;
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token payload" });
    }

    (req as AuthRequest).user = {
      id: decoded.id,
      mobileNumber: decoded.mobileNumber,
    };
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token expired" });
    }
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};
