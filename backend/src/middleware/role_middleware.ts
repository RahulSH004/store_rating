// src/common/middleware/requireRole.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { Role } from "../../generated/prisma/enums"; // or wherever your Role enum type comes from

export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authenticated"));
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      return next(new ApiError(403, "You don't have permission to perform this action"));
    }

    next();
  };
}