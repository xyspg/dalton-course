import React from "react";
import { createClient } from "next-sanity";
import { Course } from "@/types/courses.types";

const client = createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2023-07-28",
  useCdn: true,
});

async function getData() {
  const query = `
  *[ _type == "course" ]{
    slug
  }
  `;
  const res = await client.fetch(query);

  return res;
}

export default async function Page() {
  const courses = await getData();
  console.log(courses)
  for (let i = 0, len = courses.length; i < len; i++) {
    const course = courses[i];
    console.log(course.slug.current)
  }
  if (courses) {
    return (
      <>
        hi

      </>
    );
  }
}
