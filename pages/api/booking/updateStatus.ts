// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import SuperJSON from "superjson";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { bookingRequestSchema } from "../../../lib/schemas";
import { BookingStatus } from "../../../types";

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
            status: BookingStatus[status as keyof typeof BookingStatus],
        },
    });

    res.status(200).json(updatedBooking);
}
