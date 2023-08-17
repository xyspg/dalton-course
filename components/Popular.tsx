import { Redis } from "@upstash/redis";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

const redis = Redis.fromEnv();
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const cacheKey = "cachedTop10Courses";

async function getFromCache() {
  const cachedData = await redis.get(cacheKey);
  if (!cachedData) return null;
  if (typeof cachedData !== 'string') return null;
  const cachedDataParsed = JSON.parse(cachedData);
  const res = await fetchCourseDetail(cachedDataParsed);
  return cachedDataParsed.map((course: string) => {
    const courseDetails = res.result.find(
      (item: { _id: string }) => item._id === course
    );
    return courseDetails
      ? {
          id: course,
          courseName: courseDetails.courseName,
        }
      : null;
  });
}

async function getFromDBAndCache() {
  const allKeys = await redis.keys("pageviews:course:*");
  const countsPromises = allKeys.map((key) => redis.get(key));
  const counts = await Promise.all(countsPromises);

    const coursesWithCounts = allKeys.map((key, index) => ({
    id: key.split(":")[2],
  // @ts-ignore
    count: parseInt(counts[index], 10),
  }));

  const top10CourseId = coursesWithCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const ids = top10CourseId.map((course) => course.id);
  await redis.set(cacheKey, JSON.stringify(ids), {
    nx: true,
    ex: 24 * 60 * 60,
  });

  const res = await fetchCourseDetail(JSON.stringify(ids));
  return top10CourseId.map((course) => {
    const courseDetails = res.result.find(
      (item: { _id: string }) => item._id === course.id
    );
    return courseDetails
      ? {
          id: course.id,
          count: course.count,
          courseName: courseDetails.courseName,
        }
      : null;
  });
}

async function fetchCourseDetail(idArray: string) {
  const query = encodeURIComponent(
    `*[ _type == "course" && _id in ${idArray}]`
  );
  const url = `https://fbgv2m2h.api.sanity.io/v2023-07-29/data/query/production?query=${query}`;
  return fetcher(url);
}

const FetchPopularCourses = async () => {
  return (await getFromCache()) || (await getFromDBAndCache());
};

export const PopularCourses = async () => {
  const popularCourses = await FetchPopularCourses();
  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-sm font-medium underline">Popular Courses</div>
      </DialogTrigger>
      <DialogContent>
        <Table className="max-w-screen-2xl">
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {popularCourses.map(
              (course: {
                id: Key | null | undefined;
                courseName:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                count:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
              }) => (
                <TableRow key={course?.id}>
                  <TableCell className="font-medium">
                    {course?.courseName}
                  </TableCell>
                  <TableCell>{course?.count}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};
