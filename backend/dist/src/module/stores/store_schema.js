"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStoresSchema = exports.AddStoreSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ownerSchema = zod_1.default.object({
    name: zod_1.default.string().min(20).max(60),
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(8)
        .max(16)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[@$!%*#?&]/, "Password must contain at least one special character"),
    address: zod_1.default.string().max(400),
});
exports.AddStoreSchema = zod_1.default.object({
    owner: ownerSchema,
    store: zod_1.default.object({
        name: zod_1.default.string().min(1),
        email: zod_1.default.string().email(),
        address: zod_1.default.string().max(400),
    }),
});
const queryText = zod_1.default.preprocess((value) => typeof value === "string" ? value.trim() : value, zod_1.default.string().min(1));
exports.ListStoresSchema = zod_1.default.object({
    name: queryText.optional(),
    address: queryText.optional(),
    sortBy: zod_1.default.enum(["name", "email", "address", "createdAt"]).optional(),
    order: zod_1.default.enum(["asc", "desc"]).optional(),
});
//# sourceMappingURL=store_schema.js.map