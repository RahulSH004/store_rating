import { ApiError } from "../utils/ApiError";
export function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statuscode).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
}
//# sourceMappingURL=error_middlware.js.map