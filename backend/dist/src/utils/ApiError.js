"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statuscode;
    constructor(statuscode, message) {
        super(message);
        this.statuscode = statuscode;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map