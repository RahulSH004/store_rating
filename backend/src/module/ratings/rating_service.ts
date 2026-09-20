import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../db";
import { ApiError } from "../../utils/ApiError";
import { SubmitRatingSchema, type SubmitRatingInput } from "./rating_schema";

export async function submitRatingService(userId: string, data: SubmitRatingInput) {
    const parsed = SubmitRatingSchema.safeParse(data);
    if (!parsed.success) throw new ApiError(400, parsed.error.message);

    const { storeId, rating } = parsed.data;

    try {
        const store = await prisma.store.findUnique({ where: { id: storeId } });
        if (!store) throw new ApiError(404, "Store not found");

        const result = await prisma.rating.upsert({
            where: {
                userId_storeId: { userId, storeId }, // composite key
            },
            update: { rating },
            create: { userId, storeId, rating },
        });

        return result;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        console.error("Submit rating failed:", error);
        throw new ApiError(500, "Internal server error");
    }
}