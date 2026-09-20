import { Role } from "../../generated/prisma/client";
export interface JwtPayload {
    id: string;
    role: Role;
}