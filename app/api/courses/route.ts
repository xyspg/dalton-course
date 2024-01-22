import client from "@/lib/client";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { getIP } from "@/lib/ip";
const redis = Redis.fromEnv();
export async function POST(request: Request) {
  const courses = await request.json();

  if (!courses) {
    return new Response("Courses not found", { status: 404 });
  }

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(6, "1 m"),
    analytics: true,
  });
  const ip = getIP(request);

  const { success } = await ratelimit.limit(`savedCourses:${ip ?? ""}`);

  if (!success) {
    return new NextResponse(JSON.stringify({ message: "Too Many Requests" }), {
      status: 429,
    });
  }

  const query = `
    *[ _type == "course" && _id in ${JSON.stringify(courses)} | order(category)]
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
