import React from "react";
import { createClient } from "next-sanity";
import CourseDetailContent from "@/components/courses/CourseDetail";
import { Redis } from '@upstash/redis'

const client = createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2023-07-28",
  useCdn: true,
});

async function getData(slug: string) {
  const query = `
*[ _type == "course" && slug.current == '${slug}']
`;
  const res = await client.fetch(query);

  return res;
}

export const revalidate = 60

const redis = Redis.fromEnv()


interface Course {
  current: string;
}

export async function generateStaticParams(){
  const query = `
  *[ _type == "course" ]{
    slug
  }
  `;
  const courses = await client.fetch(query);
  return courses.map((course: Course)=> ({
    slug: course.current,
  }))

}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await getData(slug);
  const currentItem = res[0];
  const views = await redis.get<number>(["pageviews", "course", currentItem._id].join(":") ?? 0)
  return (
    <div className="">
      <CourseDetailContent currentItem={currentItem} views={views} />
    </div>
  );
}
