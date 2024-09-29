"use client";

import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from './columns';
import { ContractData } from "@/graphql/generated";

interface ContractsClientProps {
	data: ContractData[];
	loading: boolean;
}

export const ContractsClient: React.FC<ContractsClientProps> = ({
  data,
  loading
}) => {
  const params = useParams();
  const router = useRouter();

	const contracts = data;


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Hợp đồng (${contracts.length})`}
					description=""
				/>
				{/* <Button onClick={() => router.push(`/contracts/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button> */}
			</div>
			<Separator />
			{ loading ? <Loader /> : <DataTable searchKey="name" columns={columns} data={contracts} />}

			<Separator />
			<ApiList entityName="contracts" entityIdName="eventId" />
		</>
	);
};
