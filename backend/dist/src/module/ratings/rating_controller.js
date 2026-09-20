"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitRating = submitRating;
const rating_service_1 = require("./rating_service");
async function submitRating(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await (0, rating_service_1.submitRatingService)(userId, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=rating_controller.js.map