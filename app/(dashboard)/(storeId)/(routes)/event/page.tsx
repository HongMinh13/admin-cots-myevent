'use client';

import { EventsClient } from './components/client';
import { useGetEventsTemplateQuery } from '@/graphql/generated';
import toast from 'react-hot-toast';
import { getToken } from '@/lib';

const EventsPage = async ({ params }: { params: { storeId: string } }) => {
	const { data: events, loading } = useGetEventsTemplateQuery({
		fetchPolicy: 'network-only',
		variables: {
			input: {
				page: 1,
				limit: 100,
			},
		},
		context: {
			headers: {
				Authorization: getToken(),
			},
		},
		onError(error) {
			toast.error(error.message);
		},
	});
	

  const data = events?.getEventsTemplate.items || [];

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<EventsClient data={data} loading={loading} />
			</div>
		</div>
	);
};

export default EventsPage;
