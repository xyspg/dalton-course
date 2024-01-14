import { ImageResponse } from "next/og";
import client from "@/lib/client";
import {Course} from "@/types/courses.types";
import course from "@/schemas/course";

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Course OG Image'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
    // Font
    const interSemiBold = fetch(
        new URL('./Georgia.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    async function getData(slug: string) {
        const query = `
*[ _type == "course" && slug.current == '${slug}']
`;
        return await client.fetch(query);
    }

    const res = await getData(params.slug);
    const currentItem: Course = res[0];


    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 80,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {currentItem.courseName}
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: await interSemiBold,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}