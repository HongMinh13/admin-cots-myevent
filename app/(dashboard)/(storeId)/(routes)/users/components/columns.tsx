"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { UserData } from "@/graphql/generated";

export const columns: ColumnDef<UserData>[] = [
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'firstName',
		header: 'Họ',
	},
	{
		accessorKey: 'lastName',
		header: 'Tên',
	},
	{
		accessorKey: 'role.name',
		header: 'Quyền',
	},
	{
		accessorKey: 'phoneNumber',
		header: 'Số điện thoại',
	},
	{
		accessorKey: 'status',
		header: 'Trạng thái',
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
