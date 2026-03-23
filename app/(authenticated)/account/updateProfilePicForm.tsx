"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "@/lib/redux/slices/userApi";
import FormikImageUpload from "@/components/FormikComponents/FormikImageUpload";
import { useAuth } from "@/lib/AuthProvider";
import { useDialog } from "@/components/hooks/DialogProvider";
import DynamicButton from "@/components/common/DynamicButton";

type FormValues = {
  userProfilePic: File | string | null;
};

const validationSchema = Yup.object({
  userProfilePic: Yup.mixed().nullable(),
});

const UpdateProfilePicForm: React.FC = () => {
  const { user, imageUrl, refreshUser } = useAuth();
  const { closeDialog } = useDialog();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const initialValues: FormValues = {
    userProfilePic: imageUrl || null,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      // ✅ only send if it's a new file
      if (values.userProfilePic instanceof File) {
        formData.append("userProfilePic", values.userProfilePic);
      }

      await updateUser({ body: formData, id: user?.id || "" }).unwrap();
      closeDialog();
      refreshUser();
      toast.success("Profile picture updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-4">
          <FormikImageUpload
            name="userProfilePic"
            label="Upload Profile Picture"
          />

          <DynamicButton
            type="submit"
            variant="submit"
            isSubmitting={isLoading}
            text={isLoading ? "Uploading..." : "Update Profile"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfilePicForm;
