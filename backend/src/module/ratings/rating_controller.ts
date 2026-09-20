import { Request, Response, NextFunction } from "express";
import { submitRatingService } from "./rating_service";

export async function submitRating(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        } 
        const result = await submitRatingService(userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}