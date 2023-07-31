import React from "react";
import {
  CheckIcon,
  ClipboardCopyIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Drawer } from "vaul";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import type { Course } from "@/types/courses.types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { GetView, ReportView } from "@/components/courses/view";
import Link from 'next/link'
import {Button} from "@/components/ui/button";
interface CourseDrawerProps {
  currentItem: Course;
  onOpenChange: () => void;
  openInNewTab: boolean;
}

const CourseDrawer: React.FC<CourseDrawerProps> = ({
  currentItem,
  onOpenChange,
  openInNewTab
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const [copyIndex, setCopyIndex] = React.useState<number>(0);

  return (
    <>
      <ReportView id={currentItem._id} />
      <Drawer.Root
        shouldScaleBackground
        defaultOpen={true}
        onOpenChange={onOpenChange}
      >
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content className="bg-zinc-200 flex flex-col rounded-t-[10px] h-[76%] mt-24 fixed bottom-0 left-0 right-0 sm:h-[30%]">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />

              <div className="max-w-md mx-auto md:max-w-full md:px-8 md:flex md:flex-row md:gap-8">
                <div className="md:w-[50vw] flex flex-col gap-2">
                  <Drawer.Title className="font-medium mb-4 inline-flex flex-col items-start gap-2 font-serif">
                    <div className="inline-flex flex-row items-center gap-2">
                      <span className="text-2xl">{currentItem.courseName}</span>
                      {currentItem.HL && (
                        <span className="bg-[#f5a623] text-white rounded-full px-2 py-0.5 ml-2 text-xs font-medium uppercase">
                          HL
                        </span>
                      )}
                    </div>
                  </Drawer.Title>

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
                          Course Prerequisites
                        </p>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            copyToClipboard(currentItem.preRequisite);
                            setCopyIndex(1);
                          }}
                        >
                          {isCopied && copyIndex === 1 ? (
                            <CheckIcon />
                          ) : (
                            <ClipboardCopyIcon className="cursor-pointer" />
                          )}
                        </div>
                      </div>
                      <p className="text-zinc-600 mb-2 font-serif whitespace-pre-line">
                        {currentItem.preRequisite}
                      </p>
                    </section>

                  </div>
                  <Link
                    href={`/c/${currentItem.slug.current}`}
                    target={openInNewTab ? '_blank' : '_self'}
                  >
                    <Button variant='secondary' className='w-full'>
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <GetView id={currentItem._id} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default CourseDrawer;
