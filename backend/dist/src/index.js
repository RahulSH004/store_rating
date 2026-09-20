import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error_middlware";
import authRoutes from "./module/auth/auth_route";
import usersRoutes from "./module/users/users_route";
import storeRoutes from "./module/stores/store_routes";
import dashboardRouter from "./module/dashboard/dashboard_route";
import ratingsRouter from "./module/ratings/rating_route";
const app = express();
const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({
    origin: [frontendUrl, "http://localhost:5173"].filter((o) => Boolean(o)),
    credentials: true,
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/stores", storeRoutes);
app.use("/dashboard", dashboardRouter);
app.use("/ratings", ratingsRouter);
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});
app.use(errorHandler);
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
export default app;
//# sourceMappingURL=index.js.map