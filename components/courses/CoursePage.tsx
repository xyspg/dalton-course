import React from "react";
import CourseTable from "@/components/courses/CourseTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursePage = () => {
  return (
    <>
      <Link href="/mylist">
        {" "}
        <Button variant={"outline"} className="w-32">
          My List
        </Button>
      </Link>
      <CourseTable />
    </>
  );
};

export default CoursePage;
