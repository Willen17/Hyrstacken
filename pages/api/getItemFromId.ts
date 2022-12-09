// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { bookingSchema, itemSchema } from "../../lib/schemas";

export default async function getUserHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });

    if (req.method !== "GET") {
        return res.status(405).end();
    }

    if (!session?.user?.email) {
        return res.status(401).end();
    }

    const { id } = await itemSchema.parseAsync(req.body);

    const foundUser = await prisma.item.findUnique({
        where: { id },
    });

    res.status(200).json({ foundUser });
}
