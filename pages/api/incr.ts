import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }
  const body = await req.json();
  const id = body.id as string | undefined;
  if (!id) {
    return new NextResponse("Id not found", { status: 400 });
  }

  const ip = req.ip;
  const isNew = await redis.set(["deduplicate", ip, id].join(":"), true, {
    nx: true,
    ex: 24 * 60 * 60,
  });
  if (!isNew) {
    new NextResponse(null, { status: 202 });
  }
  await redis.incr(["pageviews", "course", id].join(":"));
  return new NextResponse(null, { status: 202 });
}
