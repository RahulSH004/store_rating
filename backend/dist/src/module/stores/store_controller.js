"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStore = addStore;
exports.listStoresquery = listStoresquery;
exports.listStoresForUser = listStoresForUser;
const store_service_1 = require("./store_service");
async function addStore(req, res, next) {
    try {
        const result = await (0, store_service_1.addStoreService)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function listStoresquery(req, res, next) {
    try {
        const result = await (0, store_service_1.listStoresService)(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function listStoresForUser(req, res, next) {
    try {
        const userId = req.user?.id;
        const result = await (0, store_service_1.listStoresForUserService)(userId, req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=store_controller.js.map