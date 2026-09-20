"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    name: zod_1.default.string().min(1).max(50),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    address: zod_1.default.string().max(255),
});
exports.SignInSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.UpdatePasswordSchema = zod_1.default.object({
    oldPassword: zod_1.default.string().min(1),
    newPassword: zod_1.default
        .string()
        .min(8)
        .max(16)
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
});
//# sourceMappingURL=auth_schema.js.map