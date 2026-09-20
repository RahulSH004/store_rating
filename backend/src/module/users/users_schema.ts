import zod from "zod";

export const AddUserSchema = zod.object({
    name: zod.string().min(1).max(60),
    email: zod.string().email(),
    password: zod
        .string()
        .min(8)
        .max(64),
    address: zod.string().max(400),
    role: zod.enum(["USER", "ADMIN", "STORE_OWNER"]),
});

export type AddUserInput = zod.infer<typeof AddUserSchema>;

const queryText = zod.preprocess(
    (value) => typeof value === "string" ? value.trim() : value,
    zod.string().min(1),
);

export const ListUsersSchema = zod.object({
    name: queryText.optional(),
    email: queryText.optional(),
    address: queryText.optional(),
    role: zod.enum(["USER", "ADMIN", "STORE_OWNER"]).optional(),
    sortBy: zod.enum(["name", "email", "address", "role", "createdAt"]).optional(),
    order: zod.enum(["asc", "desc"]).optional(),
}).superRefine((query, context) => {
    if (query.order && !query.sortBy) {
        context.addIssue({
            code: "custom",
            path: ["sortBy"],
            message: "sortBy is required when order is provided",
        });
    }
});

export type ListUsersInput = zod.infer<typeof ListUsersSchema>;