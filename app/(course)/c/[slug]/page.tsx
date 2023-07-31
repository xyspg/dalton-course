import React from "react";
import { createClient } from "next-sanity";
import CourseDetailContent from "@/components/courses/CourseDetail";
import { Redis } from "@upstash/redis";
import { Metadata } from "next";

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

export const revalidate = 60;

const redis = Redis.fromEnv();

interface Course {
  slug: {
    current: string;
  };
}

export async function generateStaticParams() {
  const query = `
  *[ _type == "course" ]{
    slug
  }
  `;
  const courses = await client.fetch(query);
  return courses
    .filter((course: Course) => course.slug)
    .map((course: Course) => ({
      slug: course.slug.current,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);
  if (!data || data.length === 0) {
    return {
      title: "Course not found",
      description: "Course not found",
    };
  }
  let description = data[0].description;
  if (description.includes('\n')) {
    // Multi-paragraph - extract first paragraph
    description = description.split('\n')[0];
  } else {
    // Single paragraph - use full description
    description = description;
  }
  return {
    title: data[0].courseName,
    description: description.substring(0,160)
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await getData(slug);
  if (!res || res.length === 0) {
    return <div className='p-1 mt-8'>Course not found</div>;
  }
  const currentItem = res[0];
  const views = await redis.get<number>(
    ["pageviews", "course", currentItem._id].join(":") ?? 0
  );
  return (
    <div className="">
      <CourseDetailContent currentItem={currentItem} views={views} />
    </div>
  );
}
