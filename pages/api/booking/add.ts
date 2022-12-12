import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma, { getUserIdFromEmail } from "../../../lib/prisma";
import { bookingSchema } from "../../../lib/schemas";
import SuperJSON from "superjson";

export default async function handle(
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

    const renterId = await getUserIdFromEmail(session.user.email);
    if (!renterId) {
        return res.status(401).end();
    }

    const { startDate, endDate, itemId } = await bookingSchema.parseAsync(
        SuperJSON.deserialize(req.body)
    );

    const booking = await prisma.booking.create({
        data: {
            startDate,
            endDate,
            renter: {
                connect: {
                    id: renterId,
                },
            },
            item: {
                connect: {
                    id: itemId,
                },
            },
        },
    });

    res.status(200).json(booking.id);
}
