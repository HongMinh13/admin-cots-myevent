"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { ContractData } from "@/graphql/generated";

export const columns: ColumnDef<ContractData>[] = [
	{
		accessorKey: 'name',
		header: 'Tên hợp đồng',
	},
	{
		accessorKey: 'rental.user.lastName',
		header: 'Người tạo',
	},
	{
		accessorKey: 'rental.totalPrice',
		header: 'Giá trị hợp đồng',
	},
	{
		accessorKey: 'status',
		header: 'Trạng thái',
	},
	{
		accessorKey: 'rental.rentalStartTime',
		header: 'Ngày thuê',
	},
	{
		accessorKey: 'rental.rentalEndTime',
		header: 'Ngày trả',
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
