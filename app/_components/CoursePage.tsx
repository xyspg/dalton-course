import React from "react";
import CourseTable from "@/app/(course-detail)/c/_components/CourseTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PopularCourses } from "@/components/Popular";

const CoursePage = () => {
  return (
    <>
      <div className="flex flex-row gap-2">
        <Link href="/mylist">
          {" "}
          <Button variant={"outline"} className="w-32">
            My List
          </Button>
        </Link>
      </div>
      <CourseTable />
      <div className="flex flex-row justify-start">
        {/*<PopularCourses />*/}
      </div>
    </>
  );
};

export default CoursePage;
