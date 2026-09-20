"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersSchema = exports.AddUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AddUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(1).max(60),
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(8)
        .max(64),
    address: zod_1.default.string().max(400),
    role: zod_1.default.enum(["USER", "ADMIN", "STORE_OWNER"]),
});
const queryText = zod_1.default.preprocess((value) => typeof value === "string" ? value.trim() : value, zod_1.default.string().min(1));
exports.ListUsersSchema = zod_1.default.object({
    name: queryText.optional(),
    email: queryText.optional(),
    address: queryText.optional(),
    role: zod_1.default.enum(["USER", "ADMIN", "STORE_OWNER"]).optional(),
    sortBy: zod_1.default.enum(["name", "email", "address", "role", "createdAt"]).optional(),
    order: zod_1.default.enum(["asc", "desc"]).optional(),
}).superRefine((query, context) => {
    if (query.order && !query.sortBy) {
        context.addIssue({
            code: "custom",
            path: ["sortBy"],
            message: "sortBy is required when order is provided",
        });
    }
});
//# sourceMappingURL=users_schema.js.map