// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { profileSchema } from "../../lib/schemas";

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

    const { name, image, bio } = await profileSchema.parseAsync(req.body);

    const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: {
            name,
            image,
            bio,
        },
    });

    res.status(200).json({ id: updatedUser.id });
}
