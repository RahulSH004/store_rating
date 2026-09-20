import { ApiError } from "../utils/ApiError";
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, "Not authenticated"));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new ApiError(403, "You don't have permission to perform this action"));
        }
        next();
    };
}
//# sourceMappingURL=role_middleware.js.map