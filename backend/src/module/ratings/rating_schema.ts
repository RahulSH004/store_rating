import zod from "zod";

export const SubmitRatingSchema = zod.object({
    storeId: zod.string().min(1),
    rating: zod.number().int().min(1).max(5),
});
export type SubmitRatingInput = zod.infer<typeof SubmitRatingSchema>;