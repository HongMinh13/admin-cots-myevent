"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"
import { ContractData, useCreateDeviceMutation, useUpdateDeviceMutation } from "@/graphql/generated"
import { TextEditor } from "@/components/ui/TextEditor"
import { getToken } from "@/lib"

const formSchema = z.object({
  name: z.string(),
  img: z.string().nullable(),
  description: z.string(),
  quantity: z.number(),
  hourlyRentalFee: z.number(),
});

type DeviceFormValues = z.infer<typeof formSchema>

interface ContractFormProps {
  initialData: ContractData | null;
};

export const DeviceForm: React.FC<ContractFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Cập nhật hợp đồng' : 'Tạo mới hợp đồng';
  const description = initialData ? '' : '';
  const toastMessage = initialData ? 'Cập nhật hợp đồng thành công.' : 'Tạo mới hợp đồng thành công.';
  const action = initialData ? 'Lưu' : 'Tạo';

  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      img: '',
      description: '',
      quantity: 0,
      hourlyRentalFee: 0,
    }
  });

  const [CreateDevice, { loading: createDeviceLoading }] =
    useCreateDeviceMutation();

  const [UpdateDevice, { loading: UpdateDeviceLoading }] =
    useUpdateDeviceMutation();

  const onSubmit = async (data: DeviceFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        UpdateDevice({
          variables: {
            input: {
              id: initialData.id,
              name: data.name,
              img: data?.img || '',
              description: data.description,
              quantity: data.quantity,
              hourlyRentalFee: data.hourlyRentalFee,
            }
          },
          context: {
            headers: {
              Authorization: getToken(),
            },
          },
        
        })
      } else {
        CreateDevice({
          variables: {
            input: {
              name: data.name,
              img: data?.img || '',
              description: data.description,
              quantity: data.quantity,
              hourlyRentalFee: data.hourlyRentalFee,
            }
          },
          context: {
            headers: {
              Authorization: getToken(),
            },
          },
        })
      }
      router.refresh();
      router.push(`/devices`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/Devices/${params.userId}`);
      router.refresh();
      router.push(`/Devices`);
      toast.success('Device deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all categories using this Device first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={loading} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="md:grid  gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thiết bị</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nhập tên thiết bị" {...field} />
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
                    <Input disabled={loading} placeholder="Nhập mô tả" {...field} />
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
                    <Input disabled={loading} placeholder="Nhập đơn giá / ngày" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid gap-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nhập số lượng" {...field} type="number" />
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
