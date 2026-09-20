"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStoreService = addStoreService;
exports.listStoresService = listStoresService;
exports.listStoresForUserService = listStoresForUserService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("../../../generated/prisma/client");
const db_1 = require("../../db");
const ApiError_1 = require("../../utils/ApiError");
const store_schema_1 = require("./store_schema");
const saltround = Number(process.env.SALT_ROUNDS ?? "10");
async function addStoreService(data) {
    const parsed = store_schema_1.AddStoreSchema.safeParse(data);
    if (!parsed.success) {
        throw new ApiError_1.ApiError(400, parsed.error.message);
    }
    const { owner, store } = parsed.data;
    try {
        return await db_1.prisma.$transaction(async (tx) => {
            const existingOwner = await tx.user.findUnique({
                where: { email: owner.email },
            });
            if (existingOwner) {
                throw new ApiError_1.ApiError(409, "Owner email already exists");
            }
            const passwordhash = await bcrypt_1.default.hash(owner.password, saltround);
            const newOwner = await tx.user.create({
                data: {
                    name: owner.name,
                    email: owner.email,
                    passwordhash,
                    address: owner.address,
                    role: "STORE_OWNER",
                },
            });
            const newStore = await tx.store.create({
                data: {
                    name: store.name,
                    email: store.email,
                    address: store.address,
                    ownerId: newOwner.id,
                },
            });
            return {
                owner: {
                    id: newOwner.id,
                    name: newOwner.name,
                    email: newOwner.email,
                    address: newOwner.address,
                    role: newOwner.role,
                },
                store: newStore,
            };
        });
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            throw error;
        }
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new ApiError_1.ApiError(409, "Owner email or store email already exists");
        }
        console.error("Store creation failed:", error);
        throw new ApiError_1.ApiError(500, "Internal server error");
    }
}
async function listStoresService(data) {
    const parsed = store_schema_1.ListStoresSchema.safeParse(data);
    if (!parsed.success)
        throw new ApiError_1.ApiError(400, parsed.error.message);
    const { name, address, sortBy, order } = parsed.data;
    const where = {};
    if (name)
        where.name = { contains: name, mode: "insensitive" };
    if (address)
        where.address = { contains: address, mode: "insensitive" };
    const stores = await db_1.prisma.store.findMany({
        where,
        orderBy: sortBy ? { [sortBy]: order ?? "asc" } : { createdAt: "desc" },
        select: {
            id: true, name: true, email: true, address: true, createdAt: true,
            owner: { select: { id: true, name: true, email: true } },
            ratings: { select: { rating: true } },
        },
    });
    return stores.map(({ ratings, ...store }) => ({
        ...store,
        averageRating: ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : null,
    }));
}
async function listStoresForUserService(userId, data) {
    const parsed = store_schema_1.ListStoresSchema.safeParse(data);
    if (!parsed.success)
        throw new ApiError_1.ApiError(400, parsed.error.message);
    const { name, address, sortBy, order } = parsed.data;
    const where = {};
    if (name)
        where.name = { contains: name, mode: "insensitive" };
    if (address)
        where.address = { contains: address, mode: "insensitive" };
    const stores = await db_1.prisma.store.findMany({
        where,
        orderBy: sortBy ? { [sortBy]: order ?? "asc" } : { createdAt: "desc" },
        select: {
            id: true, name: true, address: true,
            ratings: { select: { rating: true, userId: true } },
        },
    });
    return stores.map(({ ratings, ...store }) => ({
        ...store,
        overallRating: ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : null,
        userRating: ratings.find(r => r.userId === userId)?.rating ?? null,
    }));
}
//# sourceMappingURL=store_service.js.map