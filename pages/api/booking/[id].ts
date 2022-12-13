// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });

    if (!session?.user?.email) {
        return res.status(401).end();
    }
    const bookingId = req.query.id as string;
    if (req.method === "DELETE") {
        const item = await prisma.booking.delete({
            where: { id: bookingId },
        });
        res.status(200).json(bookingId);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}
