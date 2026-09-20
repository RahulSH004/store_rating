import { prisma } from "../../db";
import { ApiError } from "../../utils/ApiError";
export async function getDashboardStatsService() {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
        prisma.user.count(),
        prisma.store.count(),
        prisma.rating.count(),
    ]);
    return { totalUsers, totalStores, totalRatings };
}
export async function getStoreOwnerDashboardService(ownerId) {
    const store = await prisma.store.findUnique({
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
        throw new ApiError(404, "No store found for this owner");
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