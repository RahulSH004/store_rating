"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middlware_1 = require("./middleware/error_middlware");
const auth_route_1 = __importDefault(require("./module/auth/auth_route"));
const users_route_1 = __importDefault(require("./module/users/users_route"));
const store_routes_1 = __importDefault(require("./module/stores/store_routes"));
const dashboard_route_1 = __importDefault(require("./module/dashboard/dashboard_route"));
const rating_route_1 = __importDefault(require("./module/ratings/rating_route"));
const app = (0, express_1.default)();
const frontendUrl = process.env.FRONTEND_URL;
app.use((0, cors_1.default)({
    origin: [frontendUrl, "http://localhost:5173"].filter((o) => Boolean(o)),
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", users_route_1.default);
app.use("/api/stores", store_routes_1.default);
app.use("/dashboard", dashboard_route_1.default);
app.use("/ratings", rating_route_1.default);
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});
app.use(error_middlware_1.errorHandler);
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map