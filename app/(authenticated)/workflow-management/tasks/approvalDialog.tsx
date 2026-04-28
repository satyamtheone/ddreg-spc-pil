import DynamicButton from "@/components/common/DynamicButton";
import MiniChip from "@/components/common/miniChip";
import { useDialog } from "@/components/hooks/DialogProvider";
import { Task, UpdateTasAction } from "@/lib/redux/apiTypes";
import { useUpdateTaskActionMutation } from "@/lib/redux/slices/workflowApis";
import { formatedDate } from "@/lib/utilMethods";
import { Clock10Icon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import ReviewDialogContent from "./reviewDialogContent";

type ApprovalDialogProps = {
  task: Task;
};

const ApprovalDialog: React.FC<ApprovalDialogProps> = ({ task }) => {
  const { closeDialog } = useDialog();
  const [updateTaskAction, { isLoading }] = useUpdateTaskActionMutation();
  const handleSubmit = async () => {
    const payload: UpdateTasAction = {
      action: "APPROVE",
      comment: "hellow new task",
    };
    try {
      const res = await updateTaskAction({
        id: task.id,
        body: payload,
      }).unwrap();
      toast.success(res?.message || "Task created successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user");
    } finally {
      closeDialog();
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <ReviewDialogContent task={task} />

      <div className="flex items-center gap-10">
        <DynamicButton
          text="Send Back to Editing"
          variant="card"
          onClick={closeDialog}
        />
        <DynamicButton
          text=" Approve this task"
          variant="submit"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default ApprovalDialog;
