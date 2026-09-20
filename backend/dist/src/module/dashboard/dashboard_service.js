"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsService = getDashboardStatsService;
exports.getStoreOwnerDashboardService = getStoreOwnerDashboardService;
const db_1 = require("../../db");
const ApiError_1 = require("../../utils/ApiError");
async function getDashboardStatsService() {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
        db_1.prisma.user.count(),
        db_1.prisma.store.count(),
        db_1.prisma.rating.count(),
    ]);
    return { totalUsers, totalStores, totalRatings };
}
async function getStoreOwnerDashboardService(ownerId) {
    const store = await db_1.prisma.store.findUnique({
        where: { ownerId },
        select: {
            id: true,
            name: true,
            ratings: {
                select: {
                    rating: true,
                    user: { select: { id: true, name: true, email: true } },
                },
            },
        },
    });
    if (!store)
        throw new ApiError_1.ApiError(404, "No store found for this owner");
    const averageRating = store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
        : null;
    return {
        storeId: store.id,
        storeName: store.name,
        averageRating,
        raters: store.ratings.map(r => ({
            userId: r.user.id,
            name: r.user.name,
            email: r.user.email,
            rating: r.rating,
        })),
    };
}
//# sourceMappingURL=dashboard_service.js.map