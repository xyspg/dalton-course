import CoursePage from "@/components/courses/CoursePage";
import Footer from "@/components/Footer";
import { Redis } from "@upstash/redis";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <CoursePage />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
