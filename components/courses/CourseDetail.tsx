import React from "react";
import type { Course } from "@/types/courses.types";

interface CourseDetailContentProps {
    currentItem: Course;
}

const CourseDetailContent:React.FC<CourseDetailContentProps> = ({ currentItem }) => {
  return (
    <>
      <div className="max-w-md mx-auto md:max-w-full md:px-8 md:flex md:flex-row md:gap-8">
        <div className="md:w-[50vw]">
          <div className="font-medium mb-4 inline-flex flex-row items-center font-serif">
            <span className="text-2xl">{currentItem.courseName}</span>
            {currentItem.HL && (
              <span className="bg-[#f5a623] text-white rounded-full px-2 py-0.5 ml-2 text-xs font-medium uppercase">
                HL
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <section>
              <div className="flex flex-row gap-4 ">
                {/*
                          instructor
                          */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                    Instructor
                  </p>
                  <p className="text-zinc-600 font-serif">
                    {currentItem.instructor}
                  </p>
                </div>

                {/*
                          grades
                          */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                    Grades
                  </p>
                  <div className="text-zinc-600 flex flex-row gap-1">
                    {currentItem.grade.map((grade) => (
                      <span key={grade}>{grade}</span>
                    ))}
                  </div>
                </div>

                {/*
                        semester
                        */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                    Semester
                  </p>
                  <div className="text-zinc-600 flex flex-row gap-1">
                    {currentItem.semester.map((semester) => (
                      <span key={semester}>{semester}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                  Course Description
                </p>
              </div>
              <p className="text-zinc-600 mb-8 font-serif whitespace-pre-line">
                {currentItem.description}
              </p>
            </section>
          </div>
          {/*<Link*/}
          {/*  href={`/c/${currentItem._id}`}*/}
          {/*>*/}
          {/*  <button className="mt-8 flex justify-center px-10 py-2 w-1/2 text-base rounded-2xl bg-black text-white hover:text-neutral-200">*/}
          {/*    Learn more*/}
          {/*  </button>*/}
          {/*</Link>*/}
        </div>
        <div className="md:w-[40vw]">
          <section>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                Course Objectives
              </p>
            </div>
            <p className="text-zinc-600 mb-8 font-serif whitespace-pre-line">
              {currentItem.objectives}
            </p>
          </section>

          <section>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                Course Assessment
              </p>
            </div>
            <p className="text-zinc-600 mb-8 font-serif whitespace-pre-line">
              {currentItem.assessment}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default CourseDetailContent;
