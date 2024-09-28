"use client";

import { useGetDeviceByIdQuery } from "@/graphql/generated";
import { getToken } from "@/lib";
import toast from "react-hot-toast";
import { DeviceForm } from "./components/device-form";

const DevicePage = ({ params }: { params?: { deviceId: string } }) => {
  const shouldFetchDevice = params?.deviceId && params.deviceId !== "new";
  const { data: device, loading } = useGetDeviceByIdQuery({
    skip: !shouldFetchDevice,
    fetchPolicy: 'network-only',
    variables: {
      getDeviceByIdId: shouldFetchDevice ? params.deviceId : 'default-id',
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
        {!loading && <DeviceForm initialData={device?.getDeviceById ?? null} />}
      </div>
    </div>
  );
}

export default DevicePage;
