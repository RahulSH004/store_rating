import { Request, Response, NextFunction } from "express";
import { getDashboardStatsService, getStoreOwnerDashboardService } from "./dashboard_service";
import { JwtPayload } from "../../types/payload";

export async function getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await getDashboardStatsService();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
export async function getStoreOwnerDashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const ownerId = (req as Request & { user?: JwtPayload }).user?.id;
        if (!ownerId) {
            return res.status(400).json({ error: "Owner ID is required" });
        }
        const result = await getStoreOwnerDashboardService(ownerId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}