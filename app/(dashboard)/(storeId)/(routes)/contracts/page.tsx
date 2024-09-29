'use client';

import { ContractsClient } from './components/client';
import { useGetContractsQuery } from '@/graphql/generated';
import toast from 'react-hot-toast';
import { getToken } from '@/lib';

const ContractsPage = async ({ params }: { params: { storeId: string } }) => {
	const { data: contracts, loading } = useGetContractsQuery({
		fetchPolicy: 'network-only',
		variables: {
			queryParams: {
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

	contracts?.getContracts.items.map((contract) => {
		return {
			...contract,
			rental: {
				...contract.rental,
				rentalStartTime: new Date(contract.rental.rentalStartTime).toLocaleDateString(),
				rentalEndTime: new Date(contract.rental.rentalEndTime).toLocaleDateString(),
				totalPrice: contract.rental.totalPrice.toLocaleString('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}),
			},
			createdAt: new Date(contract.createdAt),
		}
	});
	

  const data = contracts?.getContracts.items || [];

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ContractsClient data={data} loading={loading} />
			</div>
		</div>
	);
};

export default ContractsPage;
