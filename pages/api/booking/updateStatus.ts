// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BookingStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import SuperJSON from "superjson";
import prisma from "../../../lib/prisma";
import { bookingRequestSchema } from "../../../lib/schemas";

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
            status: status as unknown as BookingStatus,
        },
    });

    res.status(200).json(updatedBooking);
}
