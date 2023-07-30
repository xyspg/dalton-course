import { createClient } from "next-sanity";
import { DataTable } from "@/components/courses/data-table";
import { columns } from "@/components/courses/columns";

const query = `
*[ _type == "course"] | order(category)
`;

const client = createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2023-07-28",
  useCdn: true,
});

async function getData() {
  const res = await client.fetch(query);

  return res;
}

const CourseTable = async () => {
  const courses = await getData();

  return (
    <>
      <div>
        <div>
          {courses.length > 0 && <DataTable columns={columns} data={courses} />}
        </div>
      </div>
    </>
  );
};

export default CourseTable;
