"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { LocationData } from "@/graphql/generated";

export const columns: ColumnDef<LocationData>[] = [
	{
		accessorKey: 'name',
		header: 'Tên địa điểm',
	},
	{
		accessorKey: 'description',
		header: 'Mô tả',
	},
	{
		accessorKey: 'hourlyRentalFee',
		header: 'Đơn giá / Ngày',
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
