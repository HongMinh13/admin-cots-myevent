'use client';

import { HumanResourcesClient } from './components/client';
import { useGetHumanResourcesQuery } from '@/graphql/generated';
import toast from 'react-hot-toast';
import { getToken } from '@/lib';

const HumanResourcesPage = async ({ params }: { params: { storeId: string } }) => {
	const { data: humanResources, loading } = useGetHumanResourcesQuery({
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
	
    let data = humanResources?.getHumanResources.items || [];
	data = data.map((item) => {
		return {
			...item,
			quantity: item.quantity || 0,
			hourlySalary: item.hourlySalary || 0,
		};
	})

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<HumanResourcesClient data={data} loading={loading} />
			</div>
		</div>
	);
};

export default HumanResourcesPage;
