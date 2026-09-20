import { submitRatingService } from "./rating_service";
export async function submitRating(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await submitRatingService(userId, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=rating_controller.js.map