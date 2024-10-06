"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';
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
		cell: ({ getValue }) => {
			return format(new Date(getValue<string>()), 'yyyy-MM-dd');
		},
	},
	{
		id: 'actions',
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
