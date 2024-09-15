"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { HumanResourceData } from "@/graphql/generated";

export const columns: ColumnDef<HumanResourceData>[] = [
	{
		accessorKey: 'name',
		header: 'Tên nhân sự',
	},
	{
		accessorKey: 'description',
		header: 'Mô tả',
	},
	{
		accessorKey: 'quantity',
		header: 'Số lượng',
	},
	{
		accessorKey: 'hourlySalary',
		header: 'Tiền công / Ngày',
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