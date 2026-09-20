"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const ApiError_1 = require("../utils/ApiError");
function requireRole(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return next(new ApiError_1.ApiError(401, "Not authenticated"));
        }
        if (!allowedRoles.includes(user.role)) {
            return next(new ApiError_1.ApiError(403, "You don't have permission to perform this action"));
        }
        next();
    };
}
//# sourceMappingURL=role_middleware.js.map