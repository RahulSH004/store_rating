import { addUserservice, getUserByIdService } from "./users_service";
import { listUserservice } from "./users_service";
export async function addUser(req, res, next) {
    try {
        const result = await addUserservice(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function listUsers(req, res, next) {
    try {
        const result = await listUserservice(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
export async function getUser(req, res, next) {
    const Id = req.params.id;
    if (!Id) {
        return res.status(400).json({ error: "ID is required" });
    }
    try {
        const result = await getUserByIdService(Id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=users_controller.js.map