"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';
import { CellAction } from "./cell-action"
import { DeviceData } from "@/graphql/generated";

export const columns: ColumnDef<DeviceData>[] = [
	{
		accessorKey: 'name',
		header: 'Tên thiết bị',
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
