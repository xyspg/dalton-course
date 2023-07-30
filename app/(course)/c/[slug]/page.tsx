import React from "react";
import { createClient } from "next-sanity";
import CourseDrawer from "@/components/courses/Drawer";
import { Drawer } from "vaul";
import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import CourseDetailContent from "@/components/courses/CourseDetail";

const client = createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2023-07-28",
  useCdn: false,
});

async function getData(slug: string) {
  const query = `
*[ _type == "course" && slug.current == '${slug}']
`;
  const res = await client.fetch(query);

  return res;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await getData(params.slug);
  const currentItem = res[0];
  return (
    <div className="p-4 md:p-8">
      <CourseDetailContent currentItem={currentItem} />
    </div>
  );
}
