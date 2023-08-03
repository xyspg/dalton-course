"use client";

import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const CourseCount = () => {
  const Requirements = [
    {
      grade: 10,
      semesters: [
        {
          semester: 1,
          core: ["cla", "ela", "math", "science"],
        },
      ],
    },
  ];
  const [progress, setProgress] = useState();
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="w-96">
          <Progress value={33} />
        </div>
      </div>
    </>
  );
};

export default CourseCount;
