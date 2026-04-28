import DynamicButton from "@/components/common/DynamicButton";
import MiniChip from "@/components/common/miniChip";
import { useDialog } from "@/components/hooks/DialogProvider";
import { Assignments, Task, UpdateTasAction } from "@/lib/redux/apiTypes";
import { useUpdateTaskActionMutation } from "@/lib/redux/slices/workflowApis";
import { formatedDate, isBG } from "@/lib/utilMethods";
import { CheckCircle2, Clock10Icon, User } from "lucide-react";
import { type } from "os";
import React from "react";
import toast from "react-hot-toast";
import { BsFillPatchCheckFill } from "react-icons/bs";
import ReviewDialogContent from "./reviewDialogContent";

type MoveInApproveDialogProps = {
  task: Task;
};

const MoveInApproveDialog: React.FC<MoveInApproveDialogProps> = ({ task }) => {
  const { closeDialog } = useDialog();
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
