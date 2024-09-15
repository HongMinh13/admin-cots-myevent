"use client";

import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from './columns';
import { EventData } from "@/graphql/generated";

interface EventsClientProps {
	data: EventData[];
	loading: boolean;
}

export const EventsClient: React.FC<EventsClientProps> = ({
  data,
  loading
}) => {
  const params = useParams();
  const router = useRouter();

	const events = data;


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sự kiện (${events.length})`}
					description=""
				/>
				<Button onClick={() => router.push(`/events/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Thêm mới
				</Button>
			</div>
			<Separator />
			{ loading ? <Loader /> : <DataTable searchKey="description" columns={columns} data={events} />}

			<Separator />
			<ApiList entityName="events" entityIdName="eventId" />
		</>
	);
};
