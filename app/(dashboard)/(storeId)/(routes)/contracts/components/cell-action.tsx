"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash, Check } from "lucide-react";
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
import { ContractData, Contract_Status, useConfirmContractDepositMutation } from "@/graphql/generated";
import { getToken } from "@/lib";

interface CellActionProps {
	data: ContractData;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [openCancel, setOpenCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ConfirmContractDeposit, { loading: UpdateDeviceLoading }] =
  useConfirmContractDepositMutation();

  const onConfirm = async () => {
    try {
      setLoading(true);
      ConfirmContractDeposit({
        variables: {
          input: {
            contractId: data.id,
            isApproved: true
          }
        },
        context: {
          headers: {
            Authorization: getToken(),
          },
        },
      });
      toast.success('Hợp đồng đã được duyệt và sẽ được tiến hành thực hiện.');
      router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onConfirmCancel = async () => {
    try {
      setLoading(true);
      ConfirmContractDeposit({
        variables: {
          input: {
            contractId: data.id,
            isApproved: false
          }
        },
        context: {
          headers: {
            Authorization: getToken(),
          },
        },
      });
      toast.success('Hợp đồng đã bị hủy bởi hệ thống. Trong trường hợp khách hàng đã đặt cọc, tiền đặt cọc sẽ được hoàn trả lại cho khách hàng.');
      router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      setOpenCancel(false);
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
      <AlertModal 
        isOpen={openCancel} 
        onClose={() => setOpenCancel(false)}
        onConfirm={onConfirmCancel}
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
          {/* <DropdownMenuItem
            onClick={() => router.push(`/contracts/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Chi tiết
          </DropdownMenuItem> */}
          {data.status === Contract_Status.DepositPaid && (
            <>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
              >
                <Check className="mr-2 h-4 w-4" /> Duyệt
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenCancel(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Hủy
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
