import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
const jwtsecret = process.env.JWT_SECRET;
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authorization header missing"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new ApiError(401, "Token missing"));
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.user = decoded; // this works because of the express.d.ts augmentation above
        next();
    }
    catch (error) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
}
//# sourceMappingURL=auth_middleware.js.map