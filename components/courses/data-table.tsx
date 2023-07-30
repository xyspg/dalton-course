"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/courses/data-table-pagination";
import CourseDrawer from "@/components/courses/Drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CategoryFilter,
  CheckBoxFilter,
  CommonFilter,
  GradesFilter,
} from "@/components/courses/Filter";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete?: () => void;
}

interface CourseData {
  category: string;
  HL: boolean;
  assessment: string;
  courseName: string;
  courseType: string;
  apHelpStatus: string;
  description: string;
  grade: number[];
  instructor: string;
  objectives: string;
  preRequisite: string;
  semester: number[];
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      category: false,
      grade: false,
      semester: false,
      HL: false,
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const [currentItem, setCurrentItem] = React.useState<CourseData | null>(null);
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const handleOpenChange = () => {
    setCurrentItem(null);
  };

  function getUniqueCategories(courses: CourseData[], property: string) {
    const categoriesSet = new Set();

    courses.forEach((course) => {
      if (course.hasOwnProperty(property)) {
        //@ts-ignore
        categoriesSet.add(course[property] as string);
      }
    });

    return Array.from(categoriesSet);
  }

  const handleSelectOpen = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const uniqueCategories = getUniqueCategories(
    Object.values(data) as CourseData[],
    "category"
  );
  const uniqueInstructors = getUniqueCategories(
    Object.values(data) as CourseData[],
    "instructor"
  );

  return (
    <div>
      {/*
      Filters
      */}

      <div className="flex items-start flex-col  gap-2 py-4">
        <Input
          placeholder="Search courses..."
          value={
            (table.getColumn("courseName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("courseName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <section className="flex flex-col md:flex-row flex-wrap gap-2">
          <CategoryFilter
            onSelectChange={(value) => {
              value === "All"
                ? table.getColumn("category")?.setFilterValue("")
                : table.getColumn("category")?.setFilterValue(value);
            }}
            onSelectOpen={handleSelectOpen}
            //@ts-ignore
            categories={uniqueCategories}
          />
          <GradesFilter
            onSelectChange={(value) => {
              value === "All"
                ? table.getColumn("grade")?.setFilterValue("")
                : table.getColumn("grade")?.setFilterValue(value);
            }}
            grades={["10", "11", "12"]}
          />
          <CommonFilter
            onSelectChange={(value) => {
              value === "All"
                ? table.getColumn("instructor")?.setFilterValue("")
                : table.getColumn("instructor")?.setFilterValue(value);
            }}
            categories={uniqueInstructors as string[]}
            onSelectOpen={handleSelectOpen}
            name="Instructors"
          />
          <CommonFilter
            onSelectChange={(value) => {
              {
                value === "All"
                  ? table.getColumn("semester")?.setFilterValue("")
                  : table.getColumn("semester")?.setFilterValue(value);
              }
            }}
            categories={["1", "2"]}
            name="Semesters"
          />
          <CommonFilter
            onSelectChange={(value) => {
              {
                value === "All"
                  ? table.getColumn("courseType")?.setFilterValue("")
                  : table.getColumn("courseType")?.setFilterValue(value);
              }
            }}
            categories={["core", "elective", "core_elective", "club"]}
            name="Course Type"
          />
        </section>
        <div className="my-1 ml-1 flex flex-col gap-4">
          <CheckBoxFilter
            text="HL Only"
            onCheckChange={() => {
              table.getColumn("HL")?.getFilterValue() === true
                ? table.getColumn("HL")?.setFilterValue(null)
                : table.getColumn("HL")?.setFilterValue(true);
            }}
          />
        </div>
      </div>

      {/*Column Control*/}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/*Table*/}
      <div className="mt-4 rounded-md border w-full md:w-[80vw]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="capitalize cursor-pointer"
                  onClick={() => {
                    if (isSelectOpen) return;
                    //@ts-ignore
                    setCurrentItem(row.original);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="max-w-sm" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center w-screen"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
      {currentItem && (
        <CourseDrawer
          currentItem={currentItem}
          onOpenChange={handleOpenChange}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}