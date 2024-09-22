'use client';

import { LocationsClient } from './components/client';
import { useGetLocationsQuery } from '@/graphql/generated';
import toast from 'react-hot-toast';
import { getToken } from '@/lib';

const LocationsPage = async ({ params }: { params: { storeId: string } }) => {
	const { data: locations, loading } = useGetLocationsQuery({
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
	

  const data = locations?.getLocations.items || [];

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<LocationsClient data={data} loading={loading} />
			</div>
		</div>
	);
};

export default LocationsPage;
