"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
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
  EventData,
  useCreateEventTemplateMutation,
  useCreateEventTypeMutation,
  useDeleteEventTemplateMutation,
  useGetDevicesQuery,
  useGetEventTypesQuery,
  useGetHumanResourcesQuery,
  useUpdateEventTemplateMutation,
} from "@/graphql/generated";
import { TextEditor } from "@/components/ui/TextEditor";
import { cn, getToken } from "@/lib";
import FileUploadInput from "@/components/ui/FileUploadPreviewInput";
import { showError } from "@/hooks/use-authentication";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/ui/time-picker-demo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { DialogTitle, DialogContent } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string(),
  img: z.string().nullable(),
  description: z.string(),
  detail: z.string(),
  devices: z.array(
    z.object({
      id: z.string(),
      quantity: z.string(),
      price: z.number(),
      total: z.number(),
    })
  ),
  humanResources: z.array(
    z.object({
      id: z.string(),
      quantity: z.string(),
      price: z.number(),
      total: z.number(),
    })
  ),
  timelines: z.array(
    z.object({
      id: z.string().optional(),
      timeStart: z.date(),
      description: z.string(),
    })
  ),
  eventTypes: z.object({
    name: z.string(),
  }),
  eventTypeId: z.string(),
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

  const formattedInitialData = {
    ...initialData,
    devices: initialData?.rental?.devices?.map((item) => ({
      id: item.id,
      quantity: item.quantity.toString(),
      price: item.hourlyRentalFee,
      total: item.hourlyRentalFee * item.quantity,
    })),
    humanResources: initialData?.rental?.humanResources?.map((item) => ({
      id: item.id,
      quantity: item.quantity.toString(),
      price: item.hourlySalary,
      total: item.hourlySalary * item.quantity,
    })),
    timelines: initialData?.rental?.timelines?.map((item) => ({
      id: item.id,
      timeStart: new Date(item.startTime),
      description: item.description,
    })),
    eventTypes: {
      name: initialData?.eventType?.name ?? "",
    },
    eventTypeId: initialData?.eventType?.id,
  };
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formattedInitialData || {
      name: "",
      img: "",
      description: "",
      detail: "",
      devices: [],
      humanResources: [],
      timelines: [],
      eventTypes: { name: "" },
      eventTypeId: "",
    },
  });

  const [CreateEventTemplate, { loading: createEventLoading }] =
    useCreateEventTemplateMutation();

  const [updateEventTemplateMutation, { loading: updateEventLoading }] =
    useUpdateEventTemplateMutation();

  const onSubmit = async (data: EventFormValues) => {
    try {
      setLoading(true);
      const devices = data.devices?.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
      }));
      const humanResources = data.humanResources?.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
      }));
      const timeline = data.timelines?.map((item) => ({
        id: item.id,
        timeStart: item.timeStart,
        description: item.description,
      }));
      if (initialData?.id) {
        updateEventTemplateMutation({
          variables: {
            input: {
              id: initialData.id,
              description: data.description,
              detail: data.detail,
              img: data.img,
              name: data.name,
              devices,
              humanResources,
              timeline,
              eventTypeId: data.eventTypeId,
            },
          },
          context: {
            headers: {
              Authorization: getToken(),
            },
          },
        });
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
              devices,
              humanResources,
              timeline,
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
      router.push(`/event`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const [DeleteEvent, { loading: DeleteEventLoading }] =
  useDeleteEventTemplateMutation();

  const onDelete = async () => {
    try {
      setLoading(true);
    const res = await DeleteEvent({
      variables: {
        deleteEventTemplateId: initialData?.id || ''
      },      
      context: {
        headers: {
          Authorization: getToken(),
        },
      },
    })
    if (res.data?.deleteEventTemplate.success === false) {
      toast.error(res.data?.deleteEventTemplate.message);
      return;
    }
      toast.success('Xóa sự kiện thành công.');
      router.refresh();
      router.push(`/event`);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sự kiện.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const { data: devicesData, loading: deviceLoading } = useGetDevicesQuery({
    variables: {
      input: {
        limit: 100,
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

  const { data: humanResourcesData, loading: humanResourcesLoading } =
    useGetHumanResourcesQuery({
      variables: {
        input: {
          limit: 100,
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

  const { data: eventTypesData, loading: eventTypesLoading } =
    useGetEventTypesQuery({
      variables: {
        input: {
          limit: 20,
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

  const values =
    devicesData?.getDevices.items?.map((device) => [device.id, device.name]) ??
    [];

  const humanResources =
    humanResourcesData?.getHumanResources?.items?.map((value) => [
      value.id,
      value.name,
    ]) ?? [];

  const eventTypes =
    eventTypesData?.getEventTypes.items?.map((value) => [
      value.id,
      value.name,
    ]) ?? [];

  const {
    fields: deviceFields,
    append: appendDevice,
    remove: removeDevice,
  } = useFieldArray({
    control: form.control,
    name: "devices",
  });

  const {
    fields: humanResourcesFields,
    append: appendHumanResources,
    remove: removeHumanResources,
  } = useFieldArray({
    control: form.control,
    name: "humanResources",
  });

  const {
    fields: timelinesFields,
    append: appendTimelines,
    remove: removeTimelines,
  } = useFieldArray({
    control: form.control,
    name: "timelines",
  });

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [CreateEventType] = useCreateEventTypeMutation();

  const handleSubmit = async () => {
    CreateEventType({
      variables: {
        input: {
          name,
        },
      },
      context: {
        headers: {
          Authorization: getToken(),
        },
      },
    });
    toast.success("Thêm mới loại sự kiện thành công.");
    setIsOpen(false);
    router.refresh();
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Modal
        isOpen={isOpen}
        title="Thêm mới loại sự kiện"
        description=""
        onClose={handleClose}
      >
        <DialogTitle>Tên loại sự kiện</DialogTitle>
        <DialogContent className="mt-2">
          <Input
            type="text"
            placeholder="Nhập tên loại sự kiện"
            disabled={false}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogFooter className="mt-8">
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogFooter>
      </Modal>
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
              name="eventTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại sự kiện</FormLabel>
                  <FormControl>
                    <div className="flex flex-row space-x-4">
                      <div className="w-6/12">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại sự kiện" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {eventTypes?.map(([id, name]) => (
                              <SelectItem value={id} key={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-1/12 cursor-pointer"> 
                        <div
                          className="w-16 flex justify-center items-center h-10 bg-black rounded-md"
                          onClick={() => setIsOpen(true)}
                        >
                          <Plus className="text-white text-xl font-semibold h-4 w-4" />
                        </div>
                      </div>
                    </div>
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
                  <FormLabel>Tên sự kiện</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên sự kiện"
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
          <div>
            {deviceFields?.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-row space-x-2 items-end justify-between"
              >
                <FormField
                  control={form.control}
                  name={`devices.${index}.id`}
                  render={({ field: devieField }) => (
                    <FormItem className="w-2/6">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Thiết bị
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          devieField.onChange(value);
                          const price = devicesData?.getDevices.items.find(
                            (device) => device.id === value
                          )?.hourlyRentalFee;
                          form.setValue(`devices.${index}.price`, price ?? 0);
                          form.setValue(
                            `devices.${index}.quantity`,
                            form.getValues(`devices.${index}.quantity`) ?? "1"
                          );
                          form.setValue(
                            `devices.${index}.total`,
                            (price ?? 0) *
                              Number(
                                form.getValues(`devices.${index}.quantity`) ?? 1
                              )
                          );
                        }}
                        defaultValue={devieField.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thiết bị" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {values?.map(([value, label]) => (
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
                <FormField
                  control={form.control}
                  name={`devices.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Đơn giá / ngày
                      </FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
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
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Số lượng
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const price = form.getValues(
                              `devices.${index}.price`
                            );
                            form.setValue(
                              `devices.${index}.total`,
                              (price ?? 0) * Number(e.target.value)
                            );
                          }}
                          defaultValue={1}
                          min={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`devices.${index}.total`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Thành tiền
                      </FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeDevice(index)}
                >
                  <Trash className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => appendDevice({} as any)}
            >
              Thêm thiết bị
            </Button>
          </div>
          <div>
            {humanResourcesFields?.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-row space-x-2 items-end justify-between"
              >
                <FormField
                  control={form.control}
                  name={`humanResources.${index}.id`}
                  render={({ field }) => (
                    <FormItem className="w-2/6">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Nhân sự
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const price =
                            humanResourcesData?.getHumanResources.items.find(
                              (humanResource) => humanResource.id === value
                            )?.hourlySalary;
                          form.setValue(
                            `humanResources.${index}.price`,
                            price ?? 0
                          );
                          form.setValue(
                            `humanResources.${index}.quantity`,
                            form.getValues(
                              `humanResources.${index}.quantity`
                            ) ?? "1"
                          );
                          // console.log(
                          // 	form.getValues(`humanResources`)
                          // );
                          form.setValue(
                            `humanResources.${index}.total`,
                            (price ?? 0) *
                              Number(
                                form.getValues(
                                  `humanResources.${index}.quantity`
                                ) ?? 1
                              )
                          );
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn nhân sự" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {humanResources?.map(([value, label]) => (
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
                <FormField
                  control={form.control}
                  name={`humanResources.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Đơn giá / ngày
                      </FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`humanResources.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Số lượng
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const price = form.getValues(
                              `humanResources.${index}.price`
                            );
                            form.setValue(
                              `humanResources.${index}.total`,
                              (price ?? 0) * Number(e.target.value)
                            );
                          }}
                          defaultValue={1}
                          min={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`humanResources.${index}.total`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Thành tiền
                      </FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeHumanResources(index)}
                >
                  <Trash className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => appendHumanResources({} as any)}
            >
              Thêm nhân sự
            </Button>
          </div>
          <div>
            {timelinesFields?.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-row space-x-2 justify-between items-center"
              >
                <FormField
                  control={form.control}
                  name={`timelines.${index}.timeStart`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Timeline
                      </FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP HH:mm:ss")
                              ) : (
                                <span>Chọn ngày</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            className="border border-input"
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              form.setValue(
                                `timelines.${index}.timeStart`,
                                date ?? new Date()
                              );
                            }}
                            initialFocus
                          />
                          <div className="p-3 border-t border-border">
                            <TimePicker
                              setDate={(date) => {
                                field.onChange(date);
                                form.setValue(
                                  `timelines.${index}.timeStart`,
                                  date ?? new Date()
                                );
                              }}
                              date={field.value}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`timelines.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-5/6">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Mô tả
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue(
                              `timelines.${index}.description`,
                              e.target.value
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTimelines(index)}
                >
                  <Trash className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => appendTimelines({} as any)}
            >
              Thêm timeline
            </Button>
          </div>
          <Button
            disabled={loading}
            className="ml-auto cursor-pointer"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
