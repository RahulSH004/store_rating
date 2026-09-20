import dotenv from "dotenv";
dotenv.config();
import { prisma } from "../../db";
import { SignUpSchema, UpdatePasswordInput, UpdatePasswordSchema, type SigninSchema, type SignupSchema } from "./auth_schema";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET!;
const saltround = Number(process.env.SALT_ROUNDS ?? "10");


export async function signupservice (data: SignupSchema) {

    const parsed = SignUpSchema.safeParse(data)
    if(!parsed.success) throw new ApiError(400, parsed.error.message)

    const {name, email, password, address} = data

    try{
        const existinguser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if(existinguser){
            throw new ApiError(409, "User Already Exist")
        }
        const hashpassword =  await bcrypt.hash(password, saltround)

        const newUser = await prisma.user.create({
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
        })
        return newUser;
    }catch(e){
        if(e instanceof ApiError) throw e;
        console.error("Signup failed:", e);
        throw new ApiError(500, "Internal server error")
    }
    
}

export async function siginservice(data: SigninSchema){
    const {email, password} = data;

    try {
        const existinguser = await prisma.user.findFirst({
            where: {
                email,
            }
        })
        if(!existinguser){
            throw new ApiError(401, "Invalid email or password")
        }
        const ispasswordvalid = await bcrypt.compare(password, existinguser.passwordhash);
        if(!ispasswordvalid){
            throw new ApiError(401, "Invalid credentials")
        }
        const payload = {
            id: existinguser.id,
            userId: existinguser.id,
            role: existinguser.role,
        }
        const tokens = jwt.sign(payload, jwtsecret, { expiresIn: '1h' });
        return {
            user: {
                name: existinguser.name,
                email: existinguser.email,
                role: existinguser.role
            },
            tokens
        }
    } catch (error) {
        if(error instanceof ApiError) throw error; 
        console.error("Signin failed:", error);
        throw new ApiError(500, "Internal Sever Error")
    }
}

export function logoutservice(token: string) {
    if (!token) {
        throw new ApiError(400, "Authentication token is required")
    }

    try {
        jwt.verify(token, jwtsecret);
        return { message: "Logout successful" };
    } catch (error) {
        if(error instanceof ApiError) throw error;
        if(error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "Invalid or expired token")
        }
        throw new ApiError(500, "Internal Server Error")
    }
}

export async function updatePasswordService(userId: string, data: UpdatePasswordInput) {
    const parsed = UpdatePasswordSchema.safeParse(data);
    if (!parsed.success) throw new ApiError(400, parsed.error.message);

    const { oldPassword, newPassword } = parsed.data;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new ApiError(404, "User not found");

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.passwordhash);
        if (!isOldPasswordValid) throw new ApiError(401, "Old password is incorrect");

        const newHash = await bcrypt.hash(newPassword, saltround);

        await prisma.user.update({
            where: { id: userId },
            data: { passwordhash: newHash },
        });

        return { message: "Password updated successfully" };
    } catch (error) {
        if (error instanceof ApiError) throw error;
        console.error("Update password failed:", error);
        throw new ApiError(500, "Internal server error");
    }
}