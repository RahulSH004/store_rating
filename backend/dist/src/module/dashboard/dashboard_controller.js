"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = getDashboardStats;
exports.getStoreOwnerDashboard = getStoreOwnerDashboard;
const dashboard_service_1 = require("./dashboard_service");
async function getDashboardStats(req, res, next) {
    try {
        const result = await (0, dashboard_service_1.getDashboardStatsService)();
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function getStoreOwnerDashboard(req, res, next) {
    try {
        const ownerId = req.user?.id;
        if (!ownerId) {
            return res.status(400).json({ error: "Owner ID is required" });
        }
        const result = await (0, dashboard_service_1.getStoreOwnerDashboardService)(ownerId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=dashboard_controller.js.map