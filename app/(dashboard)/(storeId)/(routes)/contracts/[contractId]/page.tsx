"use client";

import { useGetContractQuery } from "@/graphql/generated";
import { getToken } from "@/lib";
import toast from "react-hot-toast";
import { DeviceForm } from "./components/contract-form";

const ContractPage = ({ params }: { params?: { contractId: string } }) => {
  const shouldFetchContract = params?.contractId && params.contractId !== "new";
  const { data: contract, loading } = useGetContractQuery({
    skip: !shouldFetchContract,
    fetchPolicy: 'network-only',
    variables: {
      getContractId: shouldFetchContract ? params.contractId : 'default-id',
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
        {!loading && <DeviceForm initialData={contract?.getContract ?? null} />}
      </div>
    </div>
  );
}

export default ContractPage;
