// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BookingStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { bookingSchema, itemSchema, profileSchema } from "../../../lib/schemas";

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

    const { status, id } = await bookingSchema.parseAsync(req.body);

    if (!status) {
        return res.status(401).end();
    }

    const updatedItem = await prisma.item.update({
        where: { id },
        data: {
            status: status,
        },
    });

    res.status(200).json({ id: updatedItem.id });
}
