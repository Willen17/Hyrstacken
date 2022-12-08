import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from '../../../lib/prisma';
import { bookingSchema } from "../../../lib/schemas";



export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const session = await getSession({ req });

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  if (!(session?.user?.email)) {
    return res.status(401).end();
  }

  const { startDate, endDate, itemId, renter, item } = await bookingSchema.parseAsync(req.body);

  const booking = await prisma.booking.create({
              data: {
                startDate,
                endDate,
                renter: {
                  connect: {
                    email: renter.name || session.user.email,
                  },
                },
                item: {
                  connect: {
                    id: item.id,
                  },
                },
              },
            });
            res.status(200).json(booking);
}
