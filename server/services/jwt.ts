import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const SECRET = JWT_SECRET || "default-secret-key-change-in-production";

export interface JWTPayload {
  userId: string;
  mobileNumber: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for authenticated user
 * @param userId - User's unique ID
 * @param mobileNumber - User's mobile number
 * @returns JWT token string
 */
export const generateToken = (userId: string, mobileNumber: string): string => {
  const payload: JWTPayload = {
    userId,
    mobileNumber,
  };

  return jwt.sign(payload, SECRET, { algorithm: "HS256", expiresIn: "90d" });
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, SECRET, {
      algorithms: ["HS256"],
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
