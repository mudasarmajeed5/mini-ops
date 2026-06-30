import type { Request, Response } from "express";

import { users } from "../db/schema.ts";
import db from "../db/connection.ts";
import { eq } from "drizzle-orm";
import { comparePassword, encryptPassword } from "../utils/password-helper.ts";
import { generateToken } from "../utils/jwt.ts";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = await generateToken({ id: user.id, email: user.email });
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        user: {
          id: user.id,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await encryptPassword(req.body.password);
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email));
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const [user] = await db
      .insert(users)
      .values({
        ...req.body,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
      });
    const token = await generateToken({
      id: user.id,
      email: user.email,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "Account Created",
        user: user,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, req.user!.id));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User fetched successfully",
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token").status(200).json({
    message: "Logged out",
    success: true,
  })
};
