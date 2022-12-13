import { Item } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";


export default async function getUserHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== "GET") {
        return res.status(405).end();
    }

    



    const { query } = req.query

    if (!query) {
        return res.status(400).json({ error: "Query is required" })
    }

    // query prisma for items with title containing the query in typescript
    const results: Item[] = await prisma.item.findMany({
        where: {  title: { contains: query as string } }
    })    
  
    res.status(200).json(results)
}
