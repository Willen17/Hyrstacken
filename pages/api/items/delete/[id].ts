// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { itemSchema } from "../../../../lib/schemas";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });

    if (!session?.user?.email) {
        return res.status(401).end();
    }
    const itemId = req.query.id as string;
    if (req.method === "DELETE") {
        const item = await prisma.item.delete({
            where: { id: itemId },
        });
        res.status(200).json(item.title);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}
