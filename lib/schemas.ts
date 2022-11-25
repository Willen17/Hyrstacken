import { z } from "zod";

export const itemSchema = z.object({
    title: z.string(),
    price: z.number().positive().max(1000000),
    description: z.string(),
    categoryId: z.string(),
});