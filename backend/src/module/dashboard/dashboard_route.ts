import { Router } from "express";
import { authMiddleware } from "../../middleware/auth_middleware";
import { requireRole } from "../../middleware/role_middleware";
import { getDashboardStats, getStoreOwnerDashboard } from "./dashboard_controller";

const dashboardRouter: Router = Router();
dashboardRouter.get("/admin-dashboard", authMiddleware, requireRole("ADMIN"), getDashboardStats);
dashboardRouter.get("/store-owner-dashboard", authMiddleware, requireRole("STORE_OWNER"), getStoreOwnerDashboard);

export default dashboardRouter;