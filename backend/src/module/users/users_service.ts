import bcrypt from "bcrypt";
import { prisma } from "../../db";
import { ApiError } from "../../utils/ApiError";
import { AddUserSchema, type AddUserInput } from "./users_schema";
import { ListUsersSchema, type ListUsersInput } from "./users_schema";
import { Prisma } from "../../../generated/prisma/client";

const saltround = Number(process.env.SALT_ROUNDS ?? "10");

export async function addUserservice(data: AddUserInput) {
	const parsed = AddUserSchema.safeParse(data);
	if (!parsed.success) {
		throw new ApiError(400, parsed.error.message);
	}

	const { name, email, password, address, role } = parsed.data;

	try {
		const existinguser = await prisma.user.findFirst({
			where: { email },
		});

		if (existinguser) {
			throw new ApiError(409, "User Already Exist");
		}

		const hashpassword = await bcrypt.hash(password, saltround);

		return await prisma.user.create({
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
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new ApiError(409, "User Already Exist");
        }
		console.error("User creation failed:", error);
		throw new ApiError(500, "Internal server error");
	}
}

export async function listUserservice(data: ListUsersInput) {
	const parsed = ListUsersSchema.safeParse(data);
	if (!parsed.success) {
		throw new ApiError(400, parsed.error.message);
	}

	const { name, email, address, role, sortBy, order } = parsed.data;
	const where: Prisma.UserWhereInput = {};

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

	return prisma.user.findMany({
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

export async function getUserByIdService(userId: string) {
    try{
        const user = await prisma.user.findUnique({
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
        })
        if(!user){
            throw new ApiError(404, "User not found");
        }
        if(!user.store){
            return{
                ...user,
                store: null,
            }
        }
        const { ratings, ...storeWithoutRatings } = user.store;
		const averageRating = user.store && user.store.ratings.length > 0
			? user.store.ratings.reduce((sum, current) => sum + current.rating, 0) / user.store.ratings.length
			: null;
		return {
			...user,
			store:{
					...storeWithoutRatings,
					averageRating,
				}
		};
    }catch(error){
        if (error instanceof ApiError) {
            throw error;
        }
        console.error("Get user by ID failed:", error);
        throw new ApiError(500, "Internal server error");
    }
}