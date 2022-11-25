import { z } from "zod";

export const apiItemSchema = z.object({
    title: z.string(),
    price: z.number().positive().max(1000000),
    description: z.string(),
});

export const itemSchema = apiItemSchema.extend({
    price: z.string(),
});
