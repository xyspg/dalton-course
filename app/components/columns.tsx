"use client";

import {ColumnDef, Row} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Courses = {
  _id: string;
  courseName: string;
  courseType: "Core" | "Elective" | "Club";
  HL: boolean;
  instructor: string;
};

function InstructorFilter(row: any, columnId: string, filterValue: any) {

}

export const columns: ColumnDef<Courses>[] = [
  {
    accessorKey: "courseName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    filterFn: (row, columnId, filterValue) => {
      return filterValue.some((val: string) => {
        function titleCaseWithHyphen(str: string) {
          return str
            .replace(/(\w)(\S*)/g, function (_, firstChar, restOfString) {
              return firstChar.toUpperCase() + restOfString.toLowerCase();
            })
            .replace(
              /(-)(\w)(\S*)/g,
              function (_, hyphen, firstChar, restOfString) {
                return (
                  hyphen + firstChar.toUpperCase() + restOfString.toLowerCase()
                );
              },
            );
        }
        return (
          //@ts-expect-error
          titleCaseWithHyphen(val) === row.original[columnId]
        )
      })
    }
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "courseType",
    header: "Course Type",
    filterFn: "equals",
  },
  {
    accessorKey: "grade",
    header: "Grade",
    filterFn: "includesString",
  },
  {
    accessorKey: "semester",
    header: "Semester",
    filterFn: "includesString",
  },
  {
    accessorKey: "HL",
    header: "HL",
  },
];
