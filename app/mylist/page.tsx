"use client";
import { columns } from "@/components/courses/columns";
import { DataTable } from "@/components/courses/data-table";
import { Button } from "@/components/ui/button";
import Guide from "@/image/guide.jpg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { HashLoader } from "react-spinners";
import useSWR from "swr";

const MyList = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const [courses, setCourses] = useState<string | null>(null);
  const [hasDeletedItem, setHasDeletedItem] = useState<boolean>(false);
  const [loadingLocalStorage, setLoadingLocalStorage] =
    useState<boolean>(false);
  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    setLoadingLocalStorage(true);
    setCourses(savedCourses);
  }, []);
  const query = encodeURIComponent(
    `*[ _type == "course" && _id in ${courses} | order(category)]`
  );

  useEffect(() => {
    if (hasDeletedItem) {
      const savedCourses = localStorage.getItem("courses");
      setCourses(savedCourses);
      setHasDeletedItem(false);
    }
  }, [hasDeletedItem]);

  const url = `https://fbgv2m2h.api.sanity.io/v2023-07-29/data/query/production?query=${query}`;
  const { data, error, isLoading } = useSWR(!!courses ? url : null, fetcher);

  const courseData = data?.result;




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
            An error occured. Please try to refresh the page.
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
      {data && (
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
