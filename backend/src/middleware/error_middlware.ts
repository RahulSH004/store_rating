import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statuscode).json({ error: err.message });
  }

  console.error(err);

  return res.status(500).json({ error: "Internal Server Error" });
}