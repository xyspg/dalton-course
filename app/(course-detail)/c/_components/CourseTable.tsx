import { DataTable } from "@/app/components/data-table";
import { columns } from "@/app/components/columns";
import client from "@/lib/client";

const query = `
*[ _type == "course"] | order(category)
`;

export const dynamic = 'force-dynamic'

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
