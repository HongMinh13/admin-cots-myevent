"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { EventData } from "@/graphql/generated";

export const columns: ColumnDef<EventData>[] = [
	{
		accessorKey: 'name',
		header: 'Tên sự kiện',
	},
	{
		accessorKey: 'eventType.name',
		header: 'Loại sự kiện',
	},
	{
		accessorKey: 'description',
		header: 'Mô tả',
	},
	{
		accessorKey: 'createdAt',
		header: 'Ngày tạo',
	},
	{
		id: 'actions',
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];