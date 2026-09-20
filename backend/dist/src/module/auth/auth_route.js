"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth_controller");
const auth_middleware_1 = require("../../middleware/auth_middleware");
const authrouter = (0, express_1.Router)();
authrouter.post("/register", auth_controller_1.register);
authrouter.post("/login", auth_controller_1.login);
authrouter.post("/logout", auth_middleware_1.authMiddleware, auth_controller_1.logout);
authrouter.patch("/update-password", auth_middleware_1.authMiddleware, auth_controller_1.updatePassword);
exports.default = authrouter;
//# sourceMappingURL=auth_route.js.map