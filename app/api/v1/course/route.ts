/**
 * @api {post} /api/v1/course
 *
 */
import client from "@/lib/client";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { getIP } from "@/lib/ip";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
    status: 200
  })
}

const redis = Redis.fromEnv();
export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return new Response("Courses not found", { status: 404 });
  }

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
  });
  const ip = getIP(request);

  const { success } = await ratelimit.limit(`queryCourse:${ip ?? ""}`);

  if (!success) {
    return new NextResponse(JSON.stringify({ message: "Too Many Requests" }), {
      status: 429,
    });
  }

  const sanityQuery = `
    *[ _type == "course" && courseName match "${query}"]
    `;
  try {
    const res = await client.fetch(sanityQuery);
    return new Response(JSON.stringify(res));
  } catch (error: any) {
    console.error(error.message);
    return new Response("There is an error processing your request", {
      status: 500,
    });
  }
}
