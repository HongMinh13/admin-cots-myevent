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
import { DeviceData, useCreateDeviceMutation, useDeleteDeviceMutation, useUpdateDeviceMutation } from "@/graphql/generated"
import { TextEditor } from "@/components/ui/TextEditor"
import { getToken } from "@/lib"
import FileUploadInput from "@/components/ui/FileUploadPreviewInput"

const formSchema = z.object({
  name: z.string(),
  img: z.string().nullable(),
  description: z.string(),
  quantity: z.string(),
  hourlyRentalFee: z.string(),
});

type DeviceFormValues = z.infer<typeof formSchema>

interface DeviceFormProps {
  initialData: DeviceData | null;
};

export const DeviceForm: React.FC<DeviceFormProps> = ({
  initialData
}) => {
  console.log(initialData)
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Cập nhật thiết bị' : 'Tạo mới thiết bị';
  const description = initialData ? '' : '';
  const toastMessage = initialData ? 'Cập nhật thiết bị thành công.' : 'Tạo mới thiết bị thành công.';
  const action = initialData ? 'Lưu' : 'Tạo';

  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {...initialData, quantity: initialData?.quantity.toString(), hourlyRentalFee: initialData?.hourlyRentalFee.toString()} : {
		name: '',
		img: '',
		description: '',
		quantity: '0',
		hourlyRentalFee: '0',
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
		if (Number(data.quantity) < 0) {
			toast.error('Số lượng không được nhỏ hơn 0');
			return;
		}
		if (Number(data.hourlyRentalFee) < 0) {
			toast.error('Đơn giá không được nhỏ hơn 0');
			return;
		}
        UpdateDevice({
          variables: {
            input: {
              id: initialData.id,
              name: data.name,
              img: data?.img || '',
              description: data.description,
              quantity: Number(data.quantity),
              hourlyRentalFee: Number(data.hourlyRentalFee),
            }
          },
          context: {
            headers: {
              Authorization: getToken(),
            },
          },
        
        })
      } else {
		if (Number(data.quantity) < 0) {
			toast.error('Số lượng không được nhỏ hơn 0');
			return;
		}
		if (Number(data.hourlyRentalFee) < 0) {
			toast.error('Đơn giá không được nhỏ hơn 0');
			return;
		}
        CreateDevice({
          variables: {
            input: {
              name: data.name,
              img: data?.img || '',
              description: data.description,
              quantity: Number(data.quantity),
              hourlyRentalFee: Number(data.hourlyRentalFee),
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

  const [DeleteDevice, { loading: DeleteDeviceLoading }] =
    useDeleteDeviceMutation();

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await DeleteDevice({
        variables: {
          deleteDeviceId: initialData?.id || '',
        },     
		context: {
            headers: {
              Authorization: getToken(),
            },
          }, 
      })
      if (res.data?.deleteDevice.success === false) {
        toast.error(res.data?.deleteDevice.message);
        return;
      }
      toast.success('Xóa thiết bị thành công.');
      router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa thiết bị.');
    } finally {
      setOpen(false);
      setLoading(false);
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
					<div className="md:grid  gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên thiết bị</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Nhập tên thiết bị"
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
					<div className="md:grid gap-8">
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số lượng</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Nhập số lượng"
											{...field}
											type="number"
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
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung chi tiết</FormLabel>
                  <FormControl>
                    <TextEditor {...field} initialValue={initialData?.detail} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
