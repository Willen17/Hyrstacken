// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { itemSchema, profileSchema } from "../../lib/schemas";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });

    if (req.method !== "POST") {
        return res.status(405).end();
    }

    if (!session?.user?.email) {
        return res.status(401).end();
    }

    const { title, price, description, imageUrl, categoryId, id } =
        await itemSchema.parseAsync(req.body);

    const updatedItem = await prisma.item.update({
        where: { id },
        data: {
            title,
            picePerDay: price,
            description,
            imageUrl,
            category: {
                connect: {
                    id: categoryId,
                },
            },
        },
    });

    res.status(200).json({ id: updatedItem.id });
}
