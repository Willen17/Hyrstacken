// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BookingStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import SuperJSON from "superjson";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const bookingRequestSchema = z.object({
    status: z.nativeEnum(BookingStatus),
    id: z.string(),
});
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

    const { status, id } = await bookingRequestSchema.parseAsync(
        SuperJSON.deserialize(req.body)
    );

    if (!status) {
        return res.status(401).end();
    }

    const updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
            status: status,
        },
    });

    res.status(200).json(updatedBooking);
}
