import Image from 'next/image'
import { createClient } from "next-sanity";
import CoursePage from "@/components/courses/CoursePage";
export default async function Home() {
    return (
    <main className="">
        <CoursePage />
    </main>
  )
}
