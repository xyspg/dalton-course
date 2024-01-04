import { DataTable } from "@/components/courses/data-table";
import { columns } from "@/components/courses/columns";
import client from "@/lib/client";

const query = `
*[ _type == "course"] | order(category)
`;

const CourseTable = async () => {
  const courses = await client.fetch(query);

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
