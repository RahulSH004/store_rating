import express, { Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error_middlware";
import authRoutes from "./module/auth/auth_route";
import usersRoutes from "./module/users/users_route";
import storeRoutes from "./module/stores/store_routes";
import dashboardRouter from "./module/dashboard/dashboard_route";
import ratingsRouter from "./module/ratings/rating_route";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/stores", storeRoutes);
app.use('/dashboard', dashboardRouter);
app.use('/ratings', ratingsRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route not found",
    });
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});