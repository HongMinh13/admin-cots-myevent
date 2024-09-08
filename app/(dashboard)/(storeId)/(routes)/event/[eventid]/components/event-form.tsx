"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { EventData, useCreateEventTemplateMutation, useGetDevicesQuery } from "@/graphql/generated";
//import { TextEditor } from "@/components/ui/TextEditor";
import { cn, getToken } from "@/lib";
import FileUploadInput from "@/components/ui/FileUploadPreviewInput";
//import { showError } from "@/hooks/use-authentication";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string(),
  img: z.string().nullable(),
  description: z.string(),
  detail: z.string(),
  devices: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number(),
      })
    )
    .nullable(),
  humanResources: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number(),
      })
    )
    .nullable(),
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  initialData: EventData | null;
}

export const EventForm: React.FC<EventFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Cập nhật sự kiện" : "Tạo mới sự kiện";
  const description = initialData ? "" : "";
  const toastMessage = initialData ? "Cập nhật sự kiện thành công." : "Tạo mới sự kiện thành công.";
  const action = initialData ? "Lưu" : "Tạo";

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      img: "",
      description: "",
      detail: "",
      devices: [],
      humanResources: [],
    },
  });

  const [CreateEventTemplate, { loading: createEventLoading }] = useCreateEventTemplateMutation();

  const onSubmit = async (data: EventFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
      } else {
        CreateEventTemplate({
          variables: {
            input: {
              eventType: {
                name: data.name,
              },
              name: data.name,
              img: data.img,
              description: data.description,
              detail: data.detail,
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
      router.push(`/events`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/events/${params.userId}`);
      router.refresh();
      router.push(`/events`);
      toast.success("Event deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all categories using this event first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // update event template
  const endTime = new Date();
  const startTime = new Date();
  startTime.setFullYear(endTime.getFullYear() - 1);
  const { data: devicesData, loading: deviceLoading } = useGetDevicesQuery({
    variables: {
      input: {
        // endTime: endTime.toISOString(),
        // startTime: startTime.toISOString(),
      },
    },
    context: {
      headers: {
        Authorization: getToken(),
      },
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError(error) {
      showError(error);
    },
  });

  const values = devicesData?.getDevices.items.map((device) => [device.id, device.name]) ?? [];

  const {
    fields: deviceFields,
    append: appendDevice,
    remove: removeDevice,
  } = useFieldArray({
    control: form.control,
    name: "devices",
  });

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
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
                  <FileUploadInput className="w-full" value={field.value as string} onFieldChange={field.onChange} />
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
                  <FormLabel>Tên sự kiện</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nhập tên sự kiện" {...field} />
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
          </div>
          <div>
            {deviceFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name={`devices.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>Thiết bị</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {values.map(([value, label]) => (
                              <SelectItem value={value} key={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`devices.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Đơn giá / ngày</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`devices.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Số lượng</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`devices.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Thành tiền</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendDevice({} as any)}>
              Thêm thiết bị
            </Button>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
