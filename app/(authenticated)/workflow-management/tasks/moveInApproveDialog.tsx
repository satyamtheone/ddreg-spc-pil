import DynamicButton from "@/components/common/DynamicButton";
import { useDialog } from "@/components/hooks/DialogProvider";
import { Task, UpdateTasAction } from "@/lib/redux/apiTypes";
import { useUpdateTaskActionMutation } from "@/lib/redux/slices/workflowApis";
import React from "react";
import toast from "react-hot-toast";
import ReviewDialogContent from "./reviewDialogContent";
import ModalProvider from "@/components/dialog/Dialog";
import RejectTaskDialog from "./rejectTaskDialog";

type MoveInApproveDialogProps = {
  task: Task;
};

const MoveInApproveDialog: React.FC<MoveInApproveDialogProps> = ({ task }) => {
  const { closeDialog, openDialog } = useDialog();
  const [updateTaskAction, { isLoading }] = useUpdateTaskActionMutation();
  const handleSubmit = async () => {
    const payload: UpdateTasAction = {
      action: "COMPLETE",
    };
    try {
      const res = await updateTaskAction({
        id: task.id,
        body: payload,
      }).unwrap();
      toast.success(res?.message || "Task Moved successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to move task");
    } finally {
      closeDialog();
    }
  };
  const handleRejectTask = (task: Task) => {
    closeDialog();
    openDialog({
      children: (
        <ModalProvider
          size="md:w-200 w-11/12"
          title={`Move this task in Edit`}
          children={<RejectTaskDialog task={task} />}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <ReviewDialogContent task={task} />
      <div className="flex items-center gap-10">
        <DynamicButton
          text="Send Back to Editing"
          variant="card"
          onClick={() => handleRejectTask(task)}
        />
        <DynamicButton
          isSubmitting={isLoading}
          text="Send to Approve"
          variant="submit"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default MoveInApproveDialog;
