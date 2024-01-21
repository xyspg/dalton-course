import React from "react";
import client from "@/lib/client";
import { Course } from "@/types/courses.types";
import PrintImmediately, {PrintButton} from "@/app/print/print-immediately";
import Header from "@/components/Header";
import PageLayout from "@/app/pageLayout";
import {Button} from "@/components/ui/button";

const Page = async () => {
  const query = `*[ _type == "course"] | order(category)`;
  const courses = await client.fetch(query);

  return (
    <>
      <div className="print:hidden flex justify-center items-center">
        <PageLayout>
          <PrintButton />
        </PageLayout>
      </div>
      <div className="hidden print:flex flex-col gap-4 print m-4">
        <PrintImmediately />
        {courses.map((course: Course) => (
          <PrintContent
            currentItem={course}
            views={null}
            key={course._id}
            print={true}
          />
        ))}
      </div>
    </>
  );
};

export default Page;

const PrintContent = ({
  currentItem,
  views,
  print,
}: {
  currentItem: Course;
  views: number | null;
  print: boolean;
}) => {
  return (
    <div className="border border-black p-2">
      <h1 className="px-4 text-4xl font-medium font-serif">
        {currentItem.courseName}
      </h1>

      <div className="p-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          <CourseContent currentItem={currentItem} views={views} />
        </div>
      </div>
    </div>
  );
};

const CourseContent = ({
  currentItem,
  views,
}: {
  currentItem: Course;
  views: number | null;
}) => {
  return (
    <div className="max-w-lg">
      <div className="">
        <div className="flex flex-col gap-2">
          <section>
            <div className="flex flex-row gap-4 md:gap-8 flex-wrap">
              <div className="flex flex-col gap-0.5">
                <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                  Instructor
                </p>
                <p className="text-zinc-600 font-serif">
                  {currentItem.instructor}
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                  Type
                </p>
                <p className="text-zinc-600 font-serif capitalize">
                  {currentItem.courseType}
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
                  {currentItem.grade?.map((grade) => (
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
                  {currentItem.semester?.map((semester) => (
                    <span key={semester}>{semester}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                Course Prerequisite
              </p>
            </div>
            <p className="text-zinc-600 mb-8 print:mb-0 font-serif whitespace-pre-line">
              {currentItem.preRequisite}
            </p>
          </section>
          <section>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                Course Description
              </p>
            </div>
            <p className="text-zinc-600 mb-8 font-serif whitespace-pre-line ">
              {currentItem.description}
            </p>
          </section>
        </div>
      </div>
      <div className="">
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
  );
};
