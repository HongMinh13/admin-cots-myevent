"use client";

import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from './columns';
import { HumanResourceData } from "@/graphql/generated";

interface HumanResourcesClientProps {
	data: HumanResourceData[];
	loading: boolean;
}

export const HumanResourcesClient: React.FC<HumanResourcesClientProps> = ({
  data,
  loading
}) => {
  const params = useParams();
  const router = useRouter();

	const humanResources = data;


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Nhân sự (${humanResources.length})`}
					description=""
				/>
				<Button onClick={() => router.push(`/humanResources/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Thêm mới
				</Button>
			</div>
			<Separator />
			{ loading ? <Loader /> : <DataTable searchKey="description" columns={columns} data={humanResources} />}

			<Separator />
			<ApiList entityName="humanResources" entityIdName="eventId" />
		</>
	);
};
