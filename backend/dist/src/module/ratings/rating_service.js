"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitRatingService = submitRatingService;
const db_1 = require("../../db");
const ApiError_1 = require("../../utils/ApiError");
const rating_schema_1 = require("./rating_schema");
async function submitRatingService(userId, data) {
    const parsed = rating_schema_1.SubmitRatingSchema.safeParse(data);
    if (!parsed.success)
        throw new ApiError_1.ApiError(400, parsed.error.message);
    const { storeId, rating } = parsed.data;
    try {
        const store = await db_1.prisma.store.findUnique({ where: { id: storeId } });
        if (!store)
            throw new ApiError_1.ApiError(404, "Store not found");
        const result = await db_1.prisma.rating.upsert({
            where: {
                userId_storeId: { userId, storeId }, // composite key
            },
            update: { rating },
            create: { userId, storeId, rating },
        });
        return result;
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError)
            throw error;
        console.error("Submit rating failed:", error);
        throw new ApiError_1.ApiError(500, "Internal server error");
    }
}
//# sourceMappingURL=rating_service.js.map