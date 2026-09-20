"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const ApiError_1 = require("../utils/ApiError");
function errorHandler(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statuscode).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
}
//# sourceMappingURL=error_middlware.js.map