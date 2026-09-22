import DynamicButton from "@/components/common/DynamicButton";
import { useDialog } from "@/components/hooks/DialogProvider";
import { Task, UpdateTasAction } from "@/lib/redux/apiTypes";
import { useUpdateTaskActionMutation } from "@/lib/redux/slices/workflowApis";
import React from "react";
import toast from "react-hot-toast";
import EditDialogContent from "./editDialogContent";

type MoveInEditorDialogProps = {
  task: Task;
};

const MoveInEditorDialog: React.FC<MoveInEditorDialogProps> = ({ task }) => {
  const { closeDialog } = useDialog();
  const [updateTaskAction, { isLoading }] = useUpdateTaskActionMutation();
  const handleSubmit = async () => {
    const payload: UpdateTasAction = {
      action: "START",
    };
    try {
      const res = await updateTaskAction({
        id: task.id,
        body: payload,
      }).unwrap();
      toast.success(res?.message || "Task Moved successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Move Task in Edit");
    } finally {
      closeDialog();
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <EditDialogContent task={task} />
      <div className="flex items-center gap-10">
        <DynamicButton text="Close" variant="card" onClick={closeDialog} />
        <DynamicButton
          isSubmitting={isLoading}
          text="Start Editing"
          variant="submit"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default MoveInEditorDialog;
