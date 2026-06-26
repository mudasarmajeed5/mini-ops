import { Router } from "express";
import { login, register, getMe,logout } from "../controllers/authController.ts";

import { insertUserSchema } from "../db/schema.ts";
import z from "zod";
import { validateBody } from "../middleware/validation.ts";
import { authenticate } from "../middleware/auth.ts";

const router = Router();
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4, "Minimum 4 characters"),
});
router.post("/login", validateBody(loginSchema), login);
router.post("/register", validateBody(insertUserSchema), register);
router.get('/logout', logout)
router.get('/me',authenticate, getMe)
export default router;
