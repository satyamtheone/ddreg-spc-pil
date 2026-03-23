import React from "react";
import { useDialog } from "@/components/hooks/DialogProvider";
import toast from "react-hot-toast";
import { useDeleteUserMutation } from "@/lib/redux/slices/userApi";
import DynamicButton from "@/components/common/DynamicButton";

type DeleteUserDialogProps = {
  Id: string;
  Name: string;
};

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ Id, Name }) => {
  const [deleteUser, { isError, isLoading, isSuccess }] =
    useDeleteUserMutation();

  const { closeDialog } = useDialog();

  const handleSubmit = async (id: string) => {
    try {
      await deleteUser(id).unwrap();

      if (isSuccess || !isError || !isLoading) {
        toast.success(`${Name} Deleted Successfully`);
        closeDialog();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong while Deleting User",
      );
    } finally {
      closeDialog();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between gap-20">
      <div className="flex flex-col justify-between gap-6 items-center">
        <div className="text-2xl font-semibold">Are you sure!</div>
        <div className="text-base font-normal">
          You won't be able to revert this!
        </div>
      </div>

      <div className="flex justify-between gap-8 items-end h-full w-full">
        <DynamicButton
          text={isLoading ? "deleting..." : `Delete ${Name}`}
          variant="submit"
          onClick={() => handleSubmit(Id)}
          isSubmitting={isLoading || isError}
        />
        <DynamicButton text="Cancel" variant="outline" onClick={closeDialog} />
      </div>
    </div>
  );
};

export default DeleteUserDialog;
