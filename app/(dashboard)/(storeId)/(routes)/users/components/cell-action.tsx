"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, ShieldMinus, ShieldPlus, Trash } from "lucide-react";
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
import { UserData, UserStatus, useActivateUserMutation, useDeactivateUserMutation } from "@/graphql/generated";
import { getToken } from "@/lib";

interface CellActionProps {
	data: UserData;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [DeactivateUser, { loading: DeactivateUserLoading }] =
  useDeactivateUserMutation();

  const [ActivateUser, { loading: ActivateUserLoading }] =
  useActivateUserMutation();

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await DeactivateUser({
        variables: {
          deactivateUserId: data.id
        },    
        context: {
          headers: {
            Authorization: getToken(),
          },
        },  
      })
      if (res.data?.deactivateUser.success === false) {
        toast.error(res.data?.deactivateUser.message);
        return;
      }
      toast.success('Đóng băng tài khoản thành công.');
      location.reload();
      // router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đóng băng tài khoản.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onConfirmActivate = async () => {
    try {
      setLoading(true);
      const res = await ActivateUser({
        variables: {
          activateUserId: data.id
        },      
        context: {
          headers: {
            Authorization: getToken(),
          },
        },
      })
      if (res.data?.activateUser.success === false) {
        toast.error(res.data?.activateUser.message);
        return;
      }
      toast.success('Kích hoạt tài khoản thành công.');
      location.reload();
      // router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi kích hoạt tài khoản.');
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
      <AlertModal 
        isOpen={openActivate} 
        onClose={() => setOpenActivate(false)}
        onConfirm={onConfirmActivate}
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
          {
            data.status === UserStatus.Active ? (
              <DropdownMenuItem
              onClick={() => setOpen(true)}
              >
                <ShieldMinus className="mr-2 h-4 w-4" /> Đóng băng tài khoản
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => setOpenActivate(true)}
              >
                <ShieldPlus className="mr-2 h-4 w-4" /> Kích hoạt tài khoản
              </DropdownMenuItem>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
