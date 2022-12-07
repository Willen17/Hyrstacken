import { z } from "zod";

export const itemSchema = z.object({
    title: z
        .string()
        .max(50, { message: "Titel får inte vara mer än 50 tecken." })
        .min(2, { message: "Titel måste vara minst 2 tecken." }),
    price: z
        .number({
            invalid_type_error:
                "Pris måste vara ett nummer. Sätt 0 för gratis.",
        })
        .max(100000, {
            message: "Lycka till att få denna uthyrd. Maxpris är 100 000.",
        })
        .min(0, { message: "Pris måste vara ifyllt." })
        .default(0),
    description: z
        .string()
        .max(250, {
            message: "Beskrivning får inte vara mer än 250 tecken.",
        })
        .min(3, {
            message: "Beskrivning måste vara mer än 3 tecken.",
        }),
    imageUrl: z.string().optional(),
    categoryId: z.string().min(1, { message: "Kategori måste väljas." }),
    id: z.string().optional(),
});

export const profileSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Namn måste vara minst två bokstäver." })
        .max(15),
    image: z.string(),
});
