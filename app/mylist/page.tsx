"use client";
import { columns } from "@/app/components/columns";
import { DataTable } from "@/app/components/data-table";
import { Button } from "@/components/ui/button";
import Guide from "@/image/guide.jpg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { HashLoader } from "react-spinners";
import useSWR from "swr";

const MyList = () => {
  const [courses, setCourses] = useState<string | null>(null);
  const [hasDeletedItem, setHasDeletedItem] = useState<boolean>(false);
  const [loadingLocalStorage, setLoadingLocalStorage] =
    useState<boolean>(false);
  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    setLoadingLocalStorage(true);
    setCourses(savedCourses);
  }, []);

  useEffect(() => {
    if (hasDeletedItem) {
      const savedCourses = localStorage.getItem("courses");
      setCourses(savedCourses);
      setHasDeletedItem(false);
    }
  }, [hasDeletedItem]);
  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: courses,
    }).then((res) => {
        if (!res.ok) {
            throw new Error("An error occurred. Please try again.");
        }
        if (!res.ok && res.status == 429) {
            throw new Error("Too many requests.");
        }
        return res.json();
    });


    const { data, error, isLoading } = useSWR(!!courses ? '/api/courses' : null, fetcher);
  const courseData = data;

  const handleDelete = () => {
    setHasDeletedItem(true);
  };
  const handleErase = () => {
    // erase local storage
    if (typeof window === "undefined") return;
    const result = window.confirm("Are you sure you want to clear all?");
    if (!result) return;
    localStorage.removeItem("courses");
    window.location.reload();
  };

  if (isLoading || !loadingLocalStorage)
    return (
      <div className="h-[80vh] flex justify-center items-center flex-col gap-8">
        <HashLoader />
        <p className="text-neutral-700 capitalize text-xl">Loading...</p>{" "}
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500 capitalize text-xl">
            {error.message}
        </p>
      </div>
    );
  }

  if (!courses) {
    return (
      <div className="flex flex-col justify-center items-center mt-24">
        <p className="text-neutral-700">You don&apos;t have saved courses.</p>
        <p className="text-neutral-700 mb-4">
          Click on &quot;Add&quot; to add a course.
        </p>
        <Image src={Guide} alt={"guide"} height={400} />
      </div>
    );
  }
  return (
    <>
      <h2 className="p-2 mt-4 text-neutral-700 text-2xl font-bold">My List</h2>
      <div className="flex flex-row gap-4">
        <Link href="/">
          <Button variant={"outline"} className="w-32">
            Back
          </Button>
        </Link>
        <Button variant={"destructive"} onClick={handleErase} className="w-32">
          Clear All
        </Button>
      </div>
      {data && data.length > 0 && (
        <DataTable
          columns={columns}
          data={courseData}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MyList;
