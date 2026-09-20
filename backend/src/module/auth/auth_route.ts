import  { Router }  from "express";
import { register, login, logout, updatePassword } from "./auth_controller";
import { authMiddleware } from "../../middleware/auth_middleware";

const authrouter: Router = Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/logout", authMiddleware, logout);
authrouter.patch("/update-password", authMiddleware, updatePassword);

export default authrouter;