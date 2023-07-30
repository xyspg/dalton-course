"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Courses = {
    _id: string
    courseName: string
    courseType: 'Core' | 'Elective' | 'Club'
    HL: boolean
    instructor: string
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
            )
        },
    },
    {
        accessorKey: "instructor",
        header: "Instructor",
    },
    {
        accessorKey: 'category',
        header: 'Category'
    },
    {
        accessorKey: 'courseType',
        header: 'Course Type',
        filterFn: 'courseType'
    },
    {
        accessorKey: 'grade',
        header: 'Grade',
        filterFn: 'includesString'
    },
    {
        accessorKey: 'semester',
        header: 'Semester',
        filterFn: 'includesString'
    },
    {
        accessorKey: 'HL',
        header: 'HL',
    }

]