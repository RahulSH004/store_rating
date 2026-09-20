import { ApiError } from "../utils/ApiError";
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return next(new ApiError(401, "Not authenticated"));
        }
        if (!allowedRoles.includes(user.role)) {
            return next(new ApiError(403, "You don't have permission to perform this action"));
        }
        next();
    };
}
//# sourceMappingURL=role_middleware.js.map