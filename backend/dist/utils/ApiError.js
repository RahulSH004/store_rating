export class ApiError extends Error {
    statuscode;
    constructor(statuscode, message) {
        super(message);
        this.statuscode = statuscode;
        this.name = 'ApiError';
    }
}
//# sourceMappingURL=ApiError.js.map