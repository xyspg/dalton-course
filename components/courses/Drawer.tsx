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
interface CourseDrawerProps {
  currentItem: Course;
  onOpenChange: () => void;
  onDelete?: () => void;
}

const CourseDrawer: React.FC<CourseDrawerProps> = ({
  currentItem,
  onOpenChange,
  onDelete,
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const [copyIndex, setCopyIndex] = React.useState<number>(0);
  //@ts-ignore
  const [savedCourses, setSavedCourses] = useLocalStorage<string[]>(
    ["courses"],
    ""
  );
  const [saved, setSaved] = React.useState<boolean>(false);
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const [saveError, setSaveError] = React.useState<string>("");
  const [deleteError, setDeleteError] = React.useState<string>("");

  const saveCourse = () => {
    if (savedCourses.includes(currentItem._id)) {
      setSaveError("Already saved");
      return;
    }
    const newSavedCourses = [...savedCourses, currentItem._id];
    setSaved(true);
    setSavedCourses(newSavedCourses);
  };

  const deleteCourse = () => {
    if (!savedCourses.includes(currentItem._id)) {
      setDeleteError("Not existed");
      return;
    }
    setDeleted(true);
    const newSavedCourses = savedCourses.filter(
      (course) => course !== currentItem._id
    );
    setSavedCourses(newSavedCourses);
    if (onDelete) {
      onDelete();
    }
  };
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
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 sm:h-[70%]">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
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

                    <section>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
                          Course Description
                        </p>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            copyToClipboard(currentItem.description);
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
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          copyToClipboard(currentItem.objectives);
                          setCopyIndex(2);
                        }}
                      >
                        {isCopied && copyIndex === 2 ? (
                          <CheckIcon />
                        ) : (
                          <ClipboardCopyIcon className="cursor-pointer" />
                        )}
                      </div>
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
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          copyToClipboard(currentItem.assessment);
                          setCopyIndex(3);
                        }}
                      >
                        {isCopied && copyIndex === 3 ? (
                          <CheckIcon />
                        ) : (
                          <ClipboardCopyIcon className="cursor-pointer" />
                        )}
                      </div>
                    </div>
                    <p className="text-zinc-600 mb-8 font-serif whitespace-pre-line">
                      {currentItem.assessment}
                    </p>
                  </section>
                  <div className="flex flex-row mb-8 gap-4">
                    {saved ? (
                      <button className="cursor-default w-32 h-8 text-xs bg-[#3291ff] text-white py-1 px-2 rounded-2xl inline-flex justify-center items-center flex-row gap-1">
                        <CheckIcon />
                        <span className="font-sans capitalize">Added</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          saveCourse();
                        }}
                        className={cn(
                          "w-32 h-8 text-xs text-white  py-1 px-2 rounded-2xl inline-flex justify-center items-center flex-row gap-1",
                          saveError ? "bg-[#e00]" : "bg-neutral-700"
                        )}
                      >
                        <PlusCircledIcon />
                        <span className="font-sans capitalize">
                          {saveError ? saveError : "Add"}
                        </span>
                      </button>
                    )}
                    {deleted ? (
                      <button className="cursor-default w-32 h-8 text-xs bg-[#3291ff] text-white py-1 px-2 rounded-2xl inline-flex justify-center items-center flex-row gap-1">
                        <CheckIcon />
                        <span className="font-sans capitalize">Removed</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          deleteCourse();
                        }}
                        className={cn(
                          "w-32 h-8 text-xs py-1 text-white px-2 rounded-2xl inline-flex justify-center items-center flex-row gap-1",
                          deleteError ? "bg-[#e00]" : "bg-neutral-700"
                        )}
                      >
                        <TrashIcon />
                        <span className="font-sans capitalize">
                          {deleteError ? deleteError : "Remove"}
                        </span>
                      </button>
                    )}
                  </div>
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
