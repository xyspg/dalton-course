/**
 * @api {post} /api/v1/course
 *
 */
import client from "@/lib/client";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { getIP } from "@/lib/ip";

export async function OPTION() {
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
  const course = await request.json();

  if (!course) {
    return new Response("Courses not found", { status: 404 });
  }

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(6, "1 m"),
    analytics: true,
  });
  const ip = getIP(request);

  const { success } = await ratelimit.limit(`queryCourse:${ip ?? ""}`);

  if (!success) {
    return new NextResponse(JSON.stringify({ message: "Too Many Requests" }), {
      status: 429,
    });
  }

  const query = `
    *[ _type == "course" && courseName match "${course}"]
    `;
  try {
    const res = await client.fetch(query);
    return new Response(JSON.stringify(res));
  } catch (error: any) {
    console.error(error.message);
    return new Response("There is an error processing your request", {
      status: 500,
    });
  }
}
