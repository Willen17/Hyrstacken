// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";
import prisma, { getUserIdFromEmail } from "../../lib/prisma";
import { profileSchema } from "../../lib/schemas";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });

    if (!session?.user?.email) {
        return res.status(401).end();
    }

    const userId = await getUserIdFromEmail(session.user.email);

    res.status(200).json({ id: userId });
}
