import { addStoreService, listStoresForUserService, listStoresService } from "./store_service";
export async function addStore(req, res, next) {
    try {
        const result = await addStoreService(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function listStoresquery(req, res, next) {
    try {
        const result = await listStoresService(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function listStoresForUser(req, res, next) {
    try {
        const userId = req.user?.id;
        const result = await listStoresForUserService(userId, req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=store_controller.js.map