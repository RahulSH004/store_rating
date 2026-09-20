"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth_middleware");
const role_middleware_1 = require("../../middleware/role_middleware");
const store_controller_1 = require("./store_controller");
const storeRouter = (0, express_1.Router)();
storeRouter.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), store_controller_1.addStore);
storeRouter.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), store_controller_1.listStoresquery);
storeRouter.get("/browse-stores", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("USER"), store_controller_1.listStoresForUser);
exports.default = storeRouter;
//# sourceMappingURL=store_routes.js.map