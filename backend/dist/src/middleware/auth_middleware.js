"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const jwtsecret = process.env.JWT_SECRET;
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError_1.ApiError(401, "Authorization header missing"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new ApiError_1.ApiError(401, "Token missing"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtsecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new ApiError_1.ApiError(401, "Invalid or expired token"));
    }
}
//# sourceMappingURL=auth_middleware.js.map