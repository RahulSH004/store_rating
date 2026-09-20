"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth_middleware");
const role_middleware_1 = require("../../middleware/role_middleware");
const users_controller_1 = require("./users_controller");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), users_controller_1.listUsers);
usersRouter.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), users_controller_1.addUser);
usersRouter.get("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("ADMIN"), users_controller_1.getUser);
exports.default = usersRouter;
//# sourceMappingURL=users_route.js.map