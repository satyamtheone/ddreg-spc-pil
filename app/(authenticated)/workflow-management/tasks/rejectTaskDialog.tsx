"use client";
import React from "react";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useDialog } from "@/components/hooks/DialogProvider";
import { useUpdateTaskActionMutation } from "@/lib/redux/slices/workflowApis";
import { Task, UpdateTasAction } from "@/lib/redux/apiTypes";
import FormikTextarea from "@/components/FormikComponents/FormikTextArea";
import DynamicButton from "@/components/common/DynamicButton";

type RejectTaskDialogProps = {
  task: Task;
};

type FormValues = {
  rejectComment: string;
};
const RejectTaskDialog: React.FC<RejectTaskDialogProps> = ({ task }) => {
  const { closeDialog } = useDialog();
  const [updateTaskAction, { isLoading }] = useUpdateTaskActionMutation();

  const handleSubmit = async (values: FormValues) => {
    const payload: UpdateTasAction = {
      action: "REJECT",
      comment: values.rejectComment,
    };
    try {
      const res = await updateTaskAction({
        id: task.id,
        body: payload,
      }).unwrap();
      toast.success(res?.message || "Task is sended back for edit");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed To Move Task");
    } finally {
      closeDialog();
    }
  };

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        rejectComment: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="w-full flex flex-col animate-dialog-slide-down">
            <FormikTextarea
              name="rejectComment"
              rows={6}
              label="Comment"
              placeholder="Write the reason for rejection or re-work"
            />
            <div className="flex items-center gap-10">
              <DynamicButton
                text="Close"
                variant="card"
                onClick={closeDialog}
              />
              <DynamicButton
                isSubmitting={!values.rejectComment || isLoading}
                text="Send Back to Editing"
                variant="submit"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RejectTaskDialog;
