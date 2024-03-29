"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState, filterFns,
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
import { DataTablePagination } from "@/app/components/data-table-pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CategoryFilter,
  CheckBoxFilter, ComboBoxFilter,
  CommonFilter,
  GradesFilter,
} from "@/app/components/Filter";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import CourseDrawer from "@/app/components/Drawer";
import {useMediaQuery} from "@/lib/hooks/use-media-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete?: () => void;
}

interface CourseData {
  slug: { current: string };
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

  // TODO: Filter the courses based on already set filters;
  // example: only show ELA instructors when category is set to ELA
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [IsSelectOpen, setIsSelectOpen] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<CourseData | null>(null);

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
    "category",
  );

  const uniqueInstructors = getUniqueCategories(
    Object.values(data) as CourseData[],
    "instructor",
  );

  function handleOpenChange() {
    setCurrentItem(null);
  }


  return (
    <div>
      {/*
      Filters
      */}
      <div className="flex items-start flex-col  gap-2 py-4">
        <Input
          spellCheck={false}
          autoComplete="off"
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
          {/*<CommonFilter*/}
          {/*  onSelectChange={(value) => {*/}
          {/*    value === "All"*/}
          {/*      ? table.getColumn("instructor")?.setFilterValue("")*/}
          {/*      : table.getColumn("instructor")?.setFilterValue(value);*/}
          {/*  }}*/}
          {/*  categories={uniqueInstructors as string[]}*/}
          {/*  onSelectOpen={handleSelectOpen}*/}
          {/*  name="Instructors"*/}
          {/*/>*/}
          <ComboBoxFilter
            categories={uniqueInstructors as string[]}
            name="Instructors"
            onSelectChange={(value: string[]) => {
              /**
               * The problem it doesn't work is because
               * the combobox component somehow lowercase
               * everything, and mismatch in tanstack table
               * filter function `ArrIncludesSome`
               * So manually title it.
               * @param str
               */
              function title(str: string) {
                return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              }
              value.length === 0
                  ? table.getColumn("instructor")?.setFilterValue("")
                  // : table.getColumn("instructor")?.setFilterValue(value.map((v)=>title(v)));
                  : table.getColumn("instructor")?.setFilterValue(value);
            }}
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
            checked={table.getColumn("HL")?.getFilterValue() as boolean}
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
            Toggle Columns
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
      <div className="mt-4 rounded-md border w-full ">
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
                            header.getContext(),
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
                  key={row.id}
                  onClick={() => {
                    if (IsSelectOpen) return;
                    // @ts-ignore
                    setCurrentItem(row.original);
                    // window.open(
                      //@ts-ignore
                      // `/c/${row.original?.slug.current}`,
                      // "_blank",
                    // );
                  }}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="max-w-sm" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
        />
      )}
    </div>
  );
}
