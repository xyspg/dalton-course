"use client";
import React from "react";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import type { Course } from "@/types/courses.types";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ControlButton = ({ currentItem }: { currentItem: Course }) => {
  const [saved, setSaved] = React.useState<boolean>(false);
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const [saveError, setSaveError] = React.useState<string>("");
  const [deleteError, setDeleteError] = React.useState<string>("");
  const [savedCourses, setSavedCourses] = useLocalStorage<string[]>(
    "courses",
    []
  );

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
  };
  return (
    <div className="flex flex-wrap flex-row gap-4 print:hidden">
      <Button
        variant="secondary"
        className="text-neutral-800 "
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Home
      </Button>

      <Button
        className={cn(
          "w-28",
          saved
            ? "bg-[#3291ff] text-white hover:bg-[#3291ff]/80"
            : saveError
            ? "bg-[#ff1a1a] text-white hover:bg-[#ff1a1a]/80"
            : null
        )}
        onClick={saveCourse}
        variant="secondary"
      >
        <PlusCircledIcon className="mr-2 h-4 w-4" />{" "}
        {saved ? "Saved" : saveError ? "Already Saved" : "Save"}
      </Button>
      <Button
        className={cn(
          "w-28",
          deleted
            ? "bg-[#3291ff] text-white hover:bg-[#3291ff]/80"
            : deleteError
            ? "bg-[#ff1a1a] text-white hover:bg-[#ff1a1a]/80"
            : null
        )}
        onClick={deleteCourse}
        variant="secondary"
      >
        <TrashIcon className="mr-2 h-4 w-4" />{" "}
        {deleted ? "Removed" : deleteError ? "Not Saved" : "Remove"}
      </Button>
      <Link href="/mylist" target="_blank">
        {" "}
        <Button>My List</Button>
      </Link>
    </div>
  );
};

export default ControlButton;
