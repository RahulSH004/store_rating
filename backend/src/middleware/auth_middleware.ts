import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { JwtPayload } from "../types/payload";

const jwtsecret = process.env.JWT_SECRET!;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authorization header missing"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new ApiError(401, "Token missing"));
    }

    try {
        const decoded = jwt.verify(token, jwtsecret) as JwtPayload;
        (req as Request & { user?: JwtPayload }).user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
}