import { Router } from "express";
import { authMiddleware } from "../../middleware/auth_middleware";
import { requireRole } from "../../middleware/role_middleware";
import { addUser, getUser, listUsers } from "./users_controller";

const usersRouter: Router = Router();

usersRouter.get("/", authMiddleware, requireRole("ADMIN"), listUsers);
usersRouter.post("/", authMiddleware, requireRole("ADMIN"), addUser);
usersRouter.get("/:id", authMiddleware, requireRole("ADMIN"), getUser);

export default usersRouter;
