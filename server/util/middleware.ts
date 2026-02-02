import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.js";

export interface AuthRequest extends Request {
  user?: { id: any; mobileNumber?: any };
}

export const middleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.sub) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token payload" });
    }

    req.user = { id: decoded.sub, mobileNumber: decoded.phone };
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token expired" });
    }
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};
