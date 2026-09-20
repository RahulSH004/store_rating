import { Router } from "express";
import { authMiddleware } from "../../middleware/auth_middleware";
import { requireRole } from "../../middleware/role_middleware";
import { submitRating } from "./rating_controller";
const ratingsRouter = Router();
ratingsRouter.post("/", authMiddleware, requireRole("USER"), submitRating);
export default ratingsRouter;
//# sourceMappingURL=rating_route.js.map