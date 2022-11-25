// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import prisma from '../../lib/prisma';
import { itemSchema } from '../../lib/schemas';

export default async function handler(
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

  const { title, price, description, categoryId } = await itemSchema.parseAsync(req.body);

  const result = await prisma.item.create({
    data: {
      title,
      picePerDay: price,
      description,
      category: {
        connect: {
          id: categoryId,
        },
      },
      owner: {
        connect: {
          email: session.user.email,
        }
      }
    },
  });

  res.status(200).json({ id: result.id });
}
