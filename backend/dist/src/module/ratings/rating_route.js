"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth_middleware");
const role_middleware_1 = require("../../middleware/role_middleware");
const rating_controller_1 = require("./rating_controller");
const ratingsRouter = (0, express_1.Router)();
ratingsRouter.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)("USER"), rating_controller_1.submitRating);
exports.default = ratingsRouter;
//# sourceMappingURL=rating_route.js.map