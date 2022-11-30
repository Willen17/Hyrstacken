import { z } from "zod";

export const itemSchema = z.object({
    title: z
        .string()
        .max(50, { message: "Titel får inte vara mer än 50 tecken." })
        .min(2, { message: "Titel måste vara minst 2 tecken." }),
    price: z
        .number()
        .positive()
        .max(100000, {
            message: "Lycka till att få denna uthyrd. Maxpris är 100 000.",
        })
        .min(1, { message: "Pris måste vara ifyllt." }),
    description: z
        .string()
        .max(250, {
            message: "Beskrivning får inte vara mer än 250 tecken.",
        })
        .min(3, {
            message: "Beskrivning måste vara mer än 3 tecken.",
        }),
    imageUrl: z.string().optional(),
    categoryId: z.string(),
});
