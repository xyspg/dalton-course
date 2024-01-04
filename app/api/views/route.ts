import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv()

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get('id');
    if (!id) {
        return new Response('Missing id', { status: 400 });
    }
    const count = await getView(id);
    return new Response(JSON.stringify({ views: count }), {
        status: 200,
    })
}
const getView = async (id: string) => {
    const views = await redis.zscore("pageviews:course", id) || "1";
    return Number(views);
}