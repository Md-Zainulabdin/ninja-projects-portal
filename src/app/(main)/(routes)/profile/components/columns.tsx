"use client";

import Link from "next/link";
import { format } from "date-fns";

import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: () => <div className="px-4 py-2">Title</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div>{format(row.original.createdAt, "dd - MM - yyyy")}</div>
    ),
  },
  {
    accessorKey: "liveUrl",
    header: "Preview",
    cell: ({ row }) => (
      <div>
        <Link
          href={row.original.liveUrl}
          target="_blank"
          className="hover:underline"
        >
          Visit
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
