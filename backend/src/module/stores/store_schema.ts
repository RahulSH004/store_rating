import zod from "zod";

const ownerSchema = zod.object({
    name: zod.string().min(20).max(60),
    email: zod.string().email(),
    password: zod
        .string()
        .min(8)
        .max(16)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[@$!%*#?&]/, "Password must contain at least one special character"),
    address: zod.string().max(400),
});

export const AddStoreSchema = zod.object({
    owner: ownerSchema,
    store: zod.object({
        name: zod.string().min(1),
        email: zod.string().email(),
        address: zod.string().max(400),
    }),
});

const queryText = zod.preprocess(
    (value) => typeof value === "string" ? value.trim() : value,
    zod.string().min(1),
);

export const ListStoresSchema = zod.object({
    name: queryText.optional(),
    address: queryText.optional(),
    sortBy: zod.enum(["name", "email", "address", "createdAt"]).optional(),
    order: zod.enum(["asc", "desc"]).optional(),
});
export type ListStoresInput = zod.infer<typeof ListStoresSchema>;

export type AddStoreInput = zod.infer<typeof AddStoreSchema>;