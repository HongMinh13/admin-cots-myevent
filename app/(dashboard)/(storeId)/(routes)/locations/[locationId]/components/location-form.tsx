"use client";

import * as z from "zod";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  LocationData,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
} from "@/graphql/generated";
import { TextEditor } from "@/components/ui/TextEditor";
import { getToken } from "@/lib";
import FileUploadInput from "@/components/ui/FileUploadPreviewInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string(),
  img: z.string().nullable(),
  description: z.string().optional(),
  hourlyRentalFee: z.string(),
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  address: z.string(),
});

type LocationFormValues = z.infer<typeof formSchema>;

interface LocationFormProps {
  initialData: LocationData | null;
}
interface AddressFormProps {
  onChange: (address: string) => void;
}

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

export const LocationForm: React.FC<LocationFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Cập nhật địa điểm" : "Tạo mới địa điểm";
  const description = initialData ? "" : "";
  const toastMessage = initialData
    ? "Cập nhật địa điểm thành công."
    : "Tạo mới địa điểm thành công.";
  const action = initialData ? "Lưu" : "Tạo";

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          hourlyRentalFee: initialData?.hourlyRentalFee.toString(),
        }
      : {
          name: "",
          img: "",
          description: "",
          hourlyRentalFee: "0",
        },
  });

  const [CreateLocation, { loading: createLocationLoading }] =
    useCreateLocationMutation();

  const [UpdateLocation, { loading: UpdateLocationLoading }] =
    useUpdateLocationMutation();

  const onSubmit = async (data: LocationFormValues) => {
    try {
      const address = getAddressString();
      setLoading(true);
      if (initialData) {
        if (Number(data.hourlyRentalFee) < 0) {
          toast.error('Phí cho thuê không được nhỏ hơn 0');
          return;
        }
        UpdateLocation({
          variables: {
            input: {
              id: initialData.id,
              name: data.name,
              img: data?.img || "",
              description: data.description,
              hourlyRentalFee: Number(data.hourlyRentalFee),
              address,
            },
          },
          context: {
            headers: {
              Authorization: getToken(),
            },
          },
        });
      } else {
        if (Number(data.hourlyRentalFee) < 0) {
          toast.error('Đơn giá không được nhỏ hơn 0');
          return;
        }
        CreateLocation({
          variables: {
            input: {
              name: data.name,
              img: data?.img || "",
              description: data.description || "",
              hourlyRentalFee: Number(data.hourlyRentalFee),
              address
            },
          },
          context: {
            headers: {
              Authorization: getToken(),
            },
          },
        });
      }
      router.refresh();
      router.push(`/locations`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const [DeleteLocation, { loading: DeleteLocationLoading }] =
    useDeleteLocationMutation();

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await DeleteLocation({
        variables: {
          deleteLocationId: initialData?.id || ''
        }, 
        context: {
          headers: {
            Authorization: getToken(),
          },
        },     
      })
      if (res.data?.deleteLocation.success === false) {
        toast.error(res.data?.deleteLocation.message);
        return;
      }
      toast.success('Xóa địa điểm thành công.');
      router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa địa điểm');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  //   -----------------------
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(
    undefined
  );
  const [selectedWard, setSelectedWard] = useState<string | undefined>(
    undefined
  );
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    axios
      .get<City[]>(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        const citiesData = response.data;
        setCities(citiesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity && selectedDistrict && address) {
      //   onChange(getAddressString());
    }
  }, [selectedCity, selectedDistrict, address]);

  const handleCityChange = (value: string) => {
    setSelectedCity(value);

    setWards([]);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setWards([]);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };

  const getAddressString = (): string => {
    let addressString = [];

    if (selectedCity) {
      const city = cities.find((city) => city.Id === selectedCity);
      if (city) {
        addressString.unshift(city.Name);
      }
    }

    if (selectedDistrict) {
      const district = cities
        .find((city) => city.Id === selectedCity)
        ?.Districts.find((district) => district.Id === selectedDistrict);
      if (district) {
        addressString.unshift(district.Name);
      }
    }

    if (selectedWard) {
      const ward = cities
        .find((city) => city.Id === selectedCity)
        ?.Districts.find((district) => district.Id === selectedDistrict)
        ?.Wards.find((ward) => ward.Id === selectedWard);
      if (ward) {
        addressString.unshift(ward.Name);
      }
    }

    addressString.unshift(form.getValues("address"));

    return addressString.join(", ");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <FileUploadInput
                    className="w-full"
                    value={field.value as string}
                    onFieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-2/6">
                  <FormLabel>Tỉnh thành</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCityChange(value);
                    }}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh thành" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 w-fit">
                      {cities?.map(({ Id, Name }) => (
                        <SelectItem value={Id} key={Id}>
                          {Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="w-2/6">
                  <FormLabel>Quận huyện</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDistrictChange(value);
                    }}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận huyện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 w-fit">
                      {selectedCity &&
                        cities
                          .find((city) => city.Id === selectedCity)
                          ?.Districts.map(({ Id, Name }) => (
                            <SelectItem value={Id} key={Id}>
                              {Name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem className="w-2/6">
                  <FormLabel>Phường xã</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleWardChange(value);
                    }}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường xã" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-40 w-fit">
                      {selectedCity &&
                        selectedDistrict &&
                        cities
                          .find((city) => city.Id === selectedCity)
                          ?.Districts.find(
                            (district) => district.Id === selectedDistrict
                          )
                          ?.Wards.map((ward) => (
                            <SelectItem value={ward.Id} key={ward.Id}>
                              {ward.Name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số nhà, tên đường cụ thể</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập số nhà, tên đường cụ thể"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid  gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên địa điểm</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên địa điểm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid gap-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn gọn</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập mô tả"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid gap-8">
            <FormField
              control={form.control}
              name="hourlyRentalFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đơn giá / Ngày</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập đơn giá / ngày"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="md:grid gap-8">
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung chi tiết</FormLabel>
                  <FormControl>
                    <TextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
