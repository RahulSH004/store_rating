import { getDashboardStatsService, getStoreOwnerDashboardService } from "./dashboard_service";
export async function getDashboardStats(req, res, next) {
    try {
        const result = await getDashboardStatsService();
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function getStoreOwnerDashboard(req, res, next) {
    try {
        const ownerId = req.user.id;
        if (!ownerId) {
            return res.status(400).json({ error: "Owner ID is required" });
        }
        const result = await getStoreOwnerDashboardService(ownerId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=dashboard_controller.js.map