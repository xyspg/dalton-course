"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { DataTable } from "@/components/courses/data-table";
import { columns } from "@/components/courses/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Guide from "@/image/guide.jpg";
import {HashLoader} from "react-spinners";


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
      setHasDeletedItem(false)
    }
  }, [hasDeletedItem])


  const url = `https://fbgv2m2h.api.sanity.io/v2023-07-29/data/query/production?query=${query}`;
  const { data, error, isLoading, mutate } = useSWR(
    !!courses ? url : null,
    fetcher
  );

  if (isLoading || !loadingLocalStorage) return (
      <div className='h-[80vh] flex justify-center items-center flex-col gap-8'><HashLoader /><p className='text-neutral-700 capitalize text-xl'>Loading...</p> </div>
  );

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
  const handleDelete = () => {
    setHasDeletedItem(true);
  };
  const courseData = data?.result;
  return (
    <>
      <h2 className="p-2 mt-4 text-neutral-700 text-2xl font-bold">My List</h2>
      <Link href="/">
        <Button variant={"outline"} className="w-32">
          Back
        </Button>
      </Link>
      {data && <DataTable columns={columns} data={courseData} onDelete={handleDelete} />}
    </>
  );
};

export default MyList;
