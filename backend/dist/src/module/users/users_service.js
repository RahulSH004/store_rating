"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserservice = addUserservice;
exports.listUserservice = listUserservice;
exports.getUserByIdService = getUserByIdService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../db");
const ApiError_1 = require("../../utils/ApiError");
const users_schema_1 = require("./users_schema");
const users_schema_2 = require("./users_schema");
const client_1 = require("../../../generated/prisma/client");
const saltround = Number(process.env.SALT_ROUNDS ?? "10");
async function addUserservice(data) {
    const parsed = users_schema_1.AddUserSchema.safeParse(data);
    if (!parsed.success) {
        throw new ApiError_1.ApiError(400, parsed.error.message);
    }
    const { name, email, password, address, role } = parsed.data;
    try {
        const existinguser = await db_1.prisma.user.findFirst({
            where: { email },
        });
        if (existinguser) {
            throw new ApiError_1.ApiError(409, "User Already Exist");
        }
        const hashpassword = await bcrypt_1.default.hash(password, saltround);
        return await db_1.prisma.user.create({
            data: {
                name,
                email,
                passwordhash: hashpassword,
                address,
                role,
            },
            select: {
                name: true,
                email: true,
                address: true,
                role: true,
            },
        });
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new ApiError_1.ApiError(409, "User Already Exist");
        }
        console.error("User creation failed:", error);
        throw new ApiError_1.ApiError(500, "Internal server error");
    }
}
async function listUserservice(data) {
    const parsed = users_schema_2.ListUsersSchema.safeParse(data);
    if (!parsed.success) {
        throw new ApiError_1.ApiError(400, parsed.error.message);
    }
    const { name, email, address, role, sortBy, order } = parsed.data;
    const where = {};
    if (name) {
        where.name = { contains: name, mode: "insensitive" };
    }
    if (email) {
        where.email = { contains: email, mode: "insensitive" };
    }
    if (address) {
        where.address = { contains: address, mode: "insensitive" };
    }
    if (role) {
        where.role = role;
    }
    return db_1.prisma.user.findMany({
        where,
        orderBy: sortBy ? { [sortBy]: order ?? "asc" } : { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            address: true,
            role: true,
            createdAt: true,
        },
    });
}
async function getUserByIdService(userId) {
    try {
        const user = await db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                address: true,
                role: true,
                createdAt: true,
                store: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        createdAt: true,
                        ratings: {
                            select: {
                                rating: true
                            }
                        }
                    },
                },
            }
        });
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        if (!user.store) {
            return {
                ...user,
                store: null,
            };
        }
        const { ratings, ...storeWithoutRatings } = user.store;
        const averageRating = user.store && user.store.ratings.length > 0
            ? user.store.ratings.reduce((sum, current) => sum + current.rating, 0) / user.store.ratings.length
            : null;
        return {
            ...user,
            store: {
                ...storeWithoutRatings,
                averageRating,
            }
        };
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        console.error("Get user by ID failed:", error);
        throw new ApiError_1.ApiError(500, "Internal server error");
    }
}
//# sourceMappingURL=users_service.js.map