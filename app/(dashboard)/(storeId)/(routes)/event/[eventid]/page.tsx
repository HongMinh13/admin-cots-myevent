'use client';

import { useGetEventByIdQuery } from '@/graphql/generated';
import { getToken } from '@/lib';
import toast from 'react-hot-toast';
import { EventForm } from './components/event-form';
import { usePathname } from 'next/navigation';

const EventPage = () => {
	const pathname = usePathname()
	const eventId = pathname.split('/')?.[2];
	console.log(pathname)
	const shouldFetchEvent = eventId && eventId !== 'new';
	const { data: event, loading } = useGetEventByIdQuery({
		skip: !shouldFetchEvent,
		fetchPolicy: 'network-only',
		variables: {
			getEventByIdId: eventId || '',
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

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				{!loading && <EventForm initialData={event?.getEventById ?? null} />}
			</div>
		</div>
	);
};

export default EventPage;
