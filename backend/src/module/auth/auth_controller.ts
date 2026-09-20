import { NextFunction, Request, Response } from "express";
import { signupservice, siginservice, logoutservice, updatePasswordService } from "./auth_service";
import { ApiError } from "../../utils/ApiError";


export async function register(req: Request, res: Response, next: NextFunction){
    try{
        const result = await signupservice(req.body);
        res.status(201).json(result);
    }catch(error){
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction){
    try{
        const result = await siginservice(req.body);
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
}
export async function logout(req: Request, res: Response, next: NextFunction){
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1] ?? '';
        await logoutservice(token);
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        next(error);
    }
}
export async function updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await updatePasswordService(userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}