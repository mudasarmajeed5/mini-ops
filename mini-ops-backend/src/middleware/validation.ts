import type { Request, Response, NextFunction } from "express";

import { type ZodType, ZodError } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationData = schema.parse(req.body);
      req.body = validationData;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Validation Failed",
          details: e.issues.map((error) => ({
            field: error.path.join("."),
            message: error.message,
          })),
        });
      }
      next(e);
    }
  };
};
