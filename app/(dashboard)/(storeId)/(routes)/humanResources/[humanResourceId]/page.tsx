"use client";

import { useGetHumanResourceByIdQuery } from "@/graphql/generated";
import { getToken } from "@/lib";
import toast from "react-hot-toast";
import { HumanResourceForm } from "./components/humanResource-form";

const HumanResourcePage = ({ params }: { params?: { humanResourceId: string } }) => {
  const shouldFetchHumanResource = params?.humanResourceId && params.humanResourceId !== "new";
  const { data: humanResource, loading } = useGetHumanResourceByIdQuery({
    skip: !shouldFetchHumanResource,
    fetchPolicy: 'network-only',
    variables: {
      getHumanResourceByIdId: shouldFetchHumanResource ? params.humanResourceId : 'default-id',
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
        {!loading && <HumanResourceForm initialData={humanResource?.getHumanResourceById ?? null} />}
      </div>
    </div>
  );
}

export default HumanResourcePage;
