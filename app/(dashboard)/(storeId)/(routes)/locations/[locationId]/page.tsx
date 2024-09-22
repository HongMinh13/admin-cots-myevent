"use client";

import { useGetLocationByIdQuery } from "@/graphql/generated";
import { getToken } from "@/lib";
import toast from "react-hot-toast";
import { LocationForm } from "./components/location-form";

const LocationPage = ({ params }: { params?: { locationId: string } }) => {
  const shouldFetchLocation = params?.locationId && params.locationId !== "new";
  const { data: location, loading } = useGetLocationByIdQuery({
    skip: !shouldFetchLocation,
    fetchPolicy: 'network-only',
    variables: {
      getLocationByIdId: shouldFetchLocation ? params.locationId : 'default-id',
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
        {!loading && <LocationForm initialData={location?.getLocationById ?? null} />}
      </div>
    </div>
  );
}

export default LocationPage;
