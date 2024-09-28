"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from './columns';
import { UserData } from "@/graphql/generated";
import { Loader } from "lucide-react";
import { DataTableUser } from "@/components/ui/data-table-user";

interface UsersClientProps {
	data: UserData[];
	loading: boolean;
}

export const UsersClient: React.FC<UsersClientProps> = ({
  data,
  loading
}) => {
  const params = useParams();
  const router = useRouter();

	const users = data;


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Người dùng (${users.length})`}
					description=""
				/>
				{/* <Button onClick={() => router.push(`/users/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button> */}
			</div>
			<Separator />
			{ loading ? <Loader /> : <DataTableUser searchKey="email" columns={columns} data={users} />}
			
			{/* <Heading title="API" description="API Calls for Users" /> */}
			<Separator />
			<ApiList entityName="users" entityIdName="userId" />
		</>
	);
};
