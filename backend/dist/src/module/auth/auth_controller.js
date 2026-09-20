"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.updatePassword = updatePassword;
const auth_service_1 = require("./auth_service");
async function register(req, res, next) {
    try {
        const result = await (0, auth_service_1.signupservice)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function login(req, res, next) {
    try {
        const result = await (0, auth_service_1.siginservice)(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function logout(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1] ?? '';
        await (0, auth_service_1.logoutservice)(token);
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        next(error);
    }
}
async function updatePassword(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await (0, auth_service_1.updatePasswordService)(userId, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=auth_controller.js.map