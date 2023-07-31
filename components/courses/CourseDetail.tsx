import React from 'react';
import type { Course } from '@/types/courses.types';
import ControlButton from '@/components/courses/ControlButton';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface CourseDetailContentProps {
  currentItem: Course;
  views: number | null;
}

const CourseDetailContent: React.FC<CourseDetailContentProps> = ({
  currentItem,
  views,
}) => {
  return (
    <>
      <h1 className='py-4 px-2 text-4xl font-medium font-serif'>{currentItem.courseName}</h1>

      <div className='mt-2 md:mt-4 mx-auto md:gap-6 p-1'>

        <ControlButton currentItem={currentItem} />
        <div className='mt-8'>
          <div className=' mb-4 inline-flex flex-row items-center '>
            {currentItem.HL && (
              <span className='bg-[#f5a623] text-white rounded-full px-2 py-0.5 ml-2 text-xs font-medium uppercase'>
                HL
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <section>
              <div className='flex flex-row gap-4 md:gap-8 flex-wrap'>
                {/*
                          instructor
                          */}
                <div className='flex flex-col gap-0.5'>
                  <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                    Instructor
                  </p>
                  <p className='text-zinc-600 font-serif'>
                    {currentItem.instructor}
                  </p>
                </div>

                <div className='flex flex-col gap-0.5'>
                  <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                    Type
                  </p>
                  <p className='text-zinc-600 font-serif capitalize'>
                    {currentItem.courseType}
                  </p>
                </div>

                {/*
                          grades
                          */}
                <div className='flex flex-col gap-0.5'>
                  <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                    Grades
                  </p>
                  <div className='text-zinc-600 flex flex-row gap-1'>
                    {currentItem.grade.map((grade) => (
                      <span key={grade}>{grade}</span>
                    ))}
                  </div>
                </div>

                {/*
                        semester
                        */}
                <div className='flex flex-col gap-0.5'>
                  <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                    Semester
                  </p>
                  <div className='text-zinc-600 flex flex-row gap-1'>
                    {currentItem.semester.map((semester) => (
                      <span key={semester}>{semester}</span>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-0.5'>
                  <p className='text-zinc-500 my-1 inline-flex flex-row gap-1 items-center font-medium text-sm uppercase'>
                    Views <EyeOpenIcon />
                  </p>
                  <p className='text-zinc-600 '>{views}</p>
                </div>
              </div>
            </section>
            <section>
              <div className='flex flex-row gap-2 items-center'>
                <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                  Course Prerequisite
                </p>
              </div>
              <p className='text-zinc-600 mb-8 font-serif whitespace-pre-line'>
                {currentItem.preRequisite}
              </p>
            </section>
            <section>
              <div className='flex flex-row gap-2 items-center'>
                <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                  Course Description
                </p>
              </div>
              <p className='text-zinc-600 mb-8 font-serif whitespace-pre-line'>
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
        <div className=''>
          <section>
            <div className='flex flex-row gap-2 items-center'>
              <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                Course Objectives
              </p>
            </div>
            <p className='text-zinc-600 mb-8 font-serif whitespace-pre-line'>
              {currentItem.objectives}
            </p>
          </section>

          <section>
            <div className='flex flex-row gap-2 items-center'>
              <p className='text-zinc-500 my-1 font-medium text-sm uppercase'>
                Course Assessment
              </p>
            </div>
            <p className='text-zinc-600 mb-8 font-serif whitespace-pre-line'>
              {currentItem.assessment}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default CourseDetailContent;
