"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";
import { DeviceData, useDeleteDeviceMutation } from "@/graphql/generated";
import { getToken } from "@/lib";

interface CellActionProps {
	data: DeviceData;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [DeleteDevice, { loading: DeleteDeviceLoading }] =
    useDeleteDeviceMutation();

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await DeleteDevice({
        variables: {
          deleteDeviceId: data.id
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
  };

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/devices/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhật
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};