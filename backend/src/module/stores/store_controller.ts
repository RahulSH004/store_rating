import { NextFunction, Request, Response } from "express";
import { addStoreService, listStoresForUserService, listStoresService } from "./store_service";

export async function addStore(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await addStoreService(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
export async function listStoresquery(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await listStoresService(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
export async function listStoresForUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as Request & { user?: { id: string } }).user?.id as string;
        const result = await listStoresForUserService(userId, req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}