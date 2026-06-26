import { verifyToken } from "../utils/jwt.ts";
import type { NextFunction, Request, Response } from "express";
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unathorized",
    });
  }
  try {
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}
