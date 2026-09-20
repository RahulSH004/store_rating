"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth_middleware");
const role_middleware_1 = require("../../middleware/role_middleware");
const dashboard_controller_1 = require("./dashboard_controller");
const dashboardRouter = (0, express_1.Router)();
dashboardRouter.get("/admin-dashboard", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), dashboard_controller_1.getDashboardStats);
dashboardRouter.get("/store-owner-dashboard", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("STORE_OWNER"), dashboard_controller_1.getStoreOwnerDashboard);
exports.default = dashboardRouter;
//# sourceMappingURL=dashboard_route.js.map