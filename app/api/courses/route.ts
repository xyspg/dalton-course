import client from "@/lib/client";
export async function POST(request: Request) {

    const courses = await request.json()

    if (!courses) {
        return new Response("Courses not found", { status: 404 })
    }

    const query = `
    *[ _type == "course" && _id in ${JSON.stringify(courses)} | order(category)]
    `
    try {
        const res = await client.fetch(query)
        return new Response(JSON.stringify(res))
    } catch (error: any) {
        console.error(error.message)
        return new Response("There is an error processing your request", { status: 500 })
    }
}