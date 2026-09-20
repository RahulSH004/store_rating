import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET!;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, jwtsecret) as any;
        req.user = {
            ...decoded,
            userId: decoded.userId || decoded.id,
            id: decoded.id || decoded.userId,
        };
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) throw new ApiError(401, "Invalid or expired token");
        throw new ApiError(500, "Internal Server Error");
    }
}