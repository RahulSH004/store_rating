import zod from "zod";
export const SubmitRatingSchema = zod.object({
    storeId: zod.string().min(1),
    rating: zod.number().int().min(1).max(5),
});
//# sourceMappingURL=rating_schema.js.map