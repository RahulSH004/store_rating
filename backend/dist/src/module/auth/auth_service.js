"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupservice = signupservice;
exports.siginservice = siginservice;
exports.logoutservice = logoutservice;
exports.updatePasswordService = updatePasswordService;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("../../db");
const auth_schema_1 = require("./auth_schema");
const ApiError_1 = require("../../utils/ApiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const saltround = Number(process.env.SALT_ROUNDS ?? "10");
async function signupservice(data) {
    const parsed = auth_schema_1.SignUpSchema.safeParse(data);
    if (!parsed.success)
        throw new ApiError_1.ApiError(400, parsed.error.message);
    const { name, email, password, address } = data;
    try {
        const existinguser = await db_1.prisma.user.findFirst({
            where: {
                email: email,
            }
        });
        if (existinguser) {
            throw new ApiError_1.ApiError(409, "User Already Exist");
        }
        const hashpassword = await bcrypt_1.default.hash(password, saltround);
        const newUser = await db_1.prisma.user.create({
            data: {
                name,
                email,
                passwordhash: hashpassword,
                address,
                role: 'USER'
            },
            select: {
                name: true,
                email: true,
                address: true,
                role: true,
            }
        });
        return newUser;
    }
    catch (e) {
        if (e instanceof ApiError_1.ApiError)
            throw e;
        console.error("Signup failed:", e);
        throw new ApiError_1.ApiError(500, "Internal server error");
    }
}
async function siginservice(data) {
    const { email, password } = data;
    try {
        const existinguser = await db_1.prisma.user.findFirst({
            where: {
                email,
            }
        });
        if (!existinguser) {
            throw new ApiError_1.ApiError(401, "Invalid email or password");
        }
        const ispasswordvalid = await bcrypt_1.default.compare(password, existinguser.passwordhash);
        if (!ispasswordvalid) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        const payload = {
            id: existinguser.id,
            userId: existinguser.id,
            role: existinguser.role,
        };
        const tokens = jsonwebtoken_1.default.sign(payload, jwtsecret, { expiresIn: '1h' });
        return {
            user: {
                name: existinguser.name,
                email: existinguser.email,
                role: existinguser.role
            },
            tokens
        };
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError)
            throw error;
        console.error("Signin failed:", error);
        throw new ApiError_1.ApiError(500, "Internal Sever Error");
    }
}
function logoutservice(token) {
    if (!token) {
        throw new ApiError_1.ApiError(400, "Authentication token is required");
    }
    try {
        jsonwebtoken_1.default.verify(token, jwtsecret);
        return { message: "Logout successful" };
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError)
            throw error;
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new ApiError_1.ApiError(401, "Invalid or expired token");
        }
        throw new ApiError_1.ApiError(500, "Internal Server Error");
    }
}
async function updatePasswordService(userId, data) {
    const parsed = auth_schema_1.UpdatePasswordSchema.safeParse(data);
    if (!parsed.success)
        throw new ApiError_1.ApiError(400, parsed.error.message);
    const { oldPassword, newPassword } = parsed.data;
    try {
        const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new ApiError_1.ApiError(404, "User not found");
        const isOldPasswordValid = await bcrypt_1.default.compare(oldPassword, user.passwordhash);
        if (!isOldPasswordValid)
            throw new ApiError_1.ApiError(401, "Old password is incorrect");
        const newHash = await bcrypt_1.default.hash(newPassword, saltround);
        await db_1.prisma.user.update({
            where: { id: userId },
            data: { passwordhash: newHash },
        });
        return { message: "Password updated successfully" };
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError)
            throw error;
        console.error("Update password failed:", error);
        throw new ApiError_1.ApiError(500, "Internal server error");
    }
}
//# sourceMappingURL=auth_service.js.map