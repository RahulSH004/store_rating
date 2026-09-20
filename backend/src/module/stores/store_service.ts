import bcrypt from "bcrypt";
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../db";
import { ApiError } from "../../utils/ApiError";
import { AddStoreSchema, ListStoresInput, ListStoresSchema, type AddStoreInput } from "./store_schema";

const saltround = Number(process.env.SALT_ROUNDS ?? "10");

export async function addStoreService(data: AddStoreInput) {
    const parsed = AddStoreSchema.safeParse(data);
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.message);
    }

    const { owner, store } = parsed.data;

    try {
        return await prisma.$transaction(async (tx) => {
            const existingOwner = await tx.user.findUnique({
                where: { email: owner.email },
            });

            if (existingOwner) {
                throw new ApiError(409, "Owner email already exists");
            }

            const passwordhash = await bcrypt.hash(owner.password, saltround);

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
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new ApiError(409, "Owner email or store email already exists");
        }

        console.error("Store creation failed:", error);
        throw new ApiError(500, "Internal server error");
    }
}

export async function listStoresService(data: ListStoresInput) {
    const parsed = ListStoresSchema.safeParse(data);
    if (!parsed.success) throw new ApiError(400, parsed.error.message);

    const { name, address, sortBy, order } = parsed.data;
    const where: Prisma.StoreWhereInput = {};

    if (name) where.name = { contains: name, mode: "insensitive" };
    if (address) where.address = { contains: address, mode: "insensitive" };

    const stores = await prisma.store.findMany({
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

export async function listStoresForUserService(userId: string, data: ListStoresInput) {
    const parsed = ListStoresSchema.safeParse(data);
    if (!parsed.success) throw new ApiError(400, parsed.error.message);

    const { name, address, sortBy, order } = parsed.data;
    const where: Prisma.StoreWhereInput = {};
    if (name) where.name = { contains: name, mode: "insensitive" };
    if (address) where.address = { contains: address, mode: "insensitive" };

    const stores = await prisma.store.findMany({
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