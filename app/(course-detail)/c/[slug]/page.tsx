import React from "react";
import CourseDetailContent from "@/app/(course-detail)/c/_components/CourseDetail";
import {Redis} from "@upstash/redis";
import {Metadata} from "next";
import {ReportView} from "@/app/components/view";
import client from '@/lib/client'

async function getData(slug: string) {
  const query = `
*[ _type == "course" && slug.current == '${slug}']
`;
  const res = await client.fetch(query);

  return res;
}

const redis = Redis.fromEnv();

interface Course {
  slug: {
    current: string;
  };
}

// export async function generateStaticParams() {
//   const query = `
//   *[ _type == "course" ]{
//     slug
//   }
//   `;
//   let courses;
//   try {
//     courses = await client.fetch(query);
//   } catch (e) {
//     console.error(e);
//   }
//   return courses
//     .filter((course: Course) => course.slug)
//     .map((course: Course) => ({
//       slug: course.slug.current,
//     }));
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await getData(params.slug);
  if (!res || res.length === 0) {
    return {
      title: "Course not found",
      description: "Course not found",
    };
  }
  let description = res[0].description;
  if (description.includes('\n')) {
    // Multi-paragraph - extract first paragraph
    description = description.split('\n')[0];
  } else {
    // Single paragraph - use full description
    description = description;
  }
  return {
    title: res[0].courseName,
    description: description.substring(0, 160)
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await getData(slug);
  if (!res || res.length === 0) {
    return <div className='p-1 mt-8'>Course not found</div>;
  }
  const currentItem = res[0];
  const getView = async (id: string) => {
    const views = await redis.zscore("pageviews:course", id) || "1";
    return Number(views);
  }
  const viewCount = await getView(currentItem._id);

  return (
    <>
      <ReportView id={currentItem._id} />
      <CourseDetailContent currentItem={currentItem} views={viewCount} />
    </>
  );
}
