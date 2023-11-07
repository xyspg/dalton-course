import React from "react";
import CourseTable from "@/app/(course-detail)/c/_components/CourseTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Warning } from "@/app/_components/Alert";
import { PopularCourses } from "@/components/Popular";

const CoursePage = () => {
  return (
    <>
        <Warning title="Always Consult the Offcial Documents" description="While we strive to provide a comprehensive and user-friendly platform for searching and filtering school courses, please be aware that the information displayed on our website may not always reflect the most current course details or availability. The Dalton Academy frequently update their course offerings and requirements, which may not be immediately reflected on our site. Therefore, we strongly advise all users to consult the official documents or contact the respective educational institutions for the most accurate and up-to-date information regarding courses, prerequisites, and other relevant details. Our website should be used as a guide only and not as the sole source of information for making educational decisions." />
        <div className="flex flex-row gap-2 mt-2">
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
