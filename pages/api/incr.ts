import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

export const redis = Redis.fromEnv();

export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (process.env.NODE_ENV === "development") {
    return new NextResponse("localhost", { status: 200 });
  }
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


  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
  });

  const { success } = await ratelimit.limit(`pageviews:${id}` + `_${ip ?? ""}`);

  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  await redis.zincrby("pageviews:course", 1, id);
  return new NextResponse(null, { status: 202 });
}
