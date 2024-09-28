'use client';

import { DevicesClient } from './components/client';
import { useGetDevicesQuery } from '@/graphql/generated';
import toast from 'react-hot-toast';
import { getToken } from '@/lib';

const DevicesPage = async ({ params }: { params: { storeId: string } }) => {
	const { data: devices, loading } = useGetDevicesQuery({
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
	

  const data = devices?.getDevices.items || [];

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<DevicesClient data={data} loading={loading} />
			</div>
		</div>
	);
};

export default DevicesPage;
