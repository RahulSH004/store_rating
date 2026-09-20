"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitRatingSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SubmitRatingSchema = zod_1.default.object({
    storeId: zod_1.default.string().min(1),
    rating: zod_1.default.number().int().min(1).max(5),
});
//# sourceMappingURL=rating_schema.js.map