import { Router } from "express";
import { authMiddleware } from "../../middleware/auth_middleware";
import { requireRole } from "../../middleware/role_middleware";
import { addStore, listStoresForUser, listStoresquery } from "./store_controller";
const storeRouter = Router();
storeRouter.post("/", authMiddleware, requireRole("ADMIN"), addStore);
storeRouter.get("/", authMiddleware, requireRole("ADMIN"), listStoresquery);
storeRouter.get("/browse-stores", authMiddleware, requireRole("USER"), listStoresForUser);
export default storeRouter;
//# sourceMappingURL=store_routes.js.map