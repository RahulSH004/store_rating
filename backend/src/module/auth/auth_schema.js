import zod from "zod";
export const SignUpSchema = zod.object({
    name: zod.string().min(1).max(50),
    email: zod.string().email(),
    password: zod.string().min(8),
    address: zod.string().max(255),
});
export const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
});
export const UpdatePasswordSchema = zod.object({
    oldPassword: zod.string().min(1),
    newPassword: zod
        .string()
        .min(8)
        .max(16)
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
});
//# sourceMappingURL=auth_schema.js.map