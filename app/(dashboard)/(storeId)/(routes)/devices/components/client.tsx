"use client";

import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from './columns';
import { DeviceData } from "@/graphql/generated";

interface DevicesClientProps {
	data: DeviceData[];
	loading: boolean;
}

export const DevicesClient: React.FC<DevicesClientProps> = ({
  data,
  loading
}) => {
  const params = useParams();
  const router = useRouter();

	const devices = data;


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Thiết bị (${devices.length})`}
					description=""
				/>
				<Button onClick={() => router.push(`/devices/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Thêm mới
				</Button>
			</div>
			<Separator />
			{ loading ? <Loader /> : <DataTable searchKey="description" columns={columns} data={devices} />}

			<Separator />
			<ApiList entityName="devices" entityIdName="eventId" />
		</>
	);
};
