"use client";

import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from './columns';
import { LocationData } from "@/graphql/generated";

interface LocationsClientProps {
	data: LocationData[];
	loading: boolean;
}

export const LocationsClient: React.FC<LocationsClientProps> = ({
  data,
  loading
}) => {
  const params = useParams();
  const router = useRouter();

	const locations = data;


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Địa điểm (${locations.length})`}
					description=""
				/>
				<Button onClick={() => router.push(`/locations/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Thêm mới
				</Button>
			</div>
			<Separator />
			{ loading ? <Loader /> : <DataTable searchKey="description" columns={columns} data={locations} />}

			<Separator />
			<ApiList entityName="locations" entityIdName="eventId" />
		</>
	);
};
