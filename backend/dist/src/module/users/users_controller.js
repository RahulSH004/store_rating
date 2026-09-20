"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.listUsers = listUsers;
exports.getUser = getUser;
const users_service_1 = require("./users_service");
const users_service_2 = require("./users_service");
async function addUser(req, res, next) {
    try {
        const result = await (0, users_service_1.addUserservice)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function listUsers(req, res, next) {
    try {
        const result = await (0, users_service_2.listUserservice)(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function getUser(req, res, next) {
    const Id = req.params.id;
    if (!Id) {
        return res.status(400).json({ error: "ID is required" });
    }
    try {
        const result = await (0, users_service_1.getUserByIdService)(Id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=users_controller.js.map