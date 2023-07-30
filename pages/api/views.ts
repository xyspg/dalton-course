import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "use GET" });
    }
    const id = req.query.id as string | undefined;
    if (!id) {
        return res.status(400).json({ message: "Id not found" });
    }
    const views = await redis.get(["pageviews", "course", id].join(":"));
    return res.status(200).json({ views: views || 0 });
}