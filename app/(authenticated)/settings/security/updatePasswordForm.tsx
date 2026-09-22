"use client";

import React, { useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import FormikPassword from "@/components/FormikComponents/FormikPassword";
import DynamicButton from "@/components/common/DynamicButton";
import {
  ChangePasswordRequest,
  useChangePasswordMutation,
} from "@/lib/redux/slices/authApi";
import { updatePasswordValidationSchema } from "@/lib/utilsSchema";

type FormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePasswordForm: React.FC = () => {
  const [updatepassword, { isLoading, isError, error }] =
    useChangePasswordMutation();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const payload: ChangePasswordRequest = {
        newPassword: values.newPassword,
        oldPassword: values.password,
      };
      await updatepassword(payload).unwrap();

      setStatus({ success: "Password updated successfully" });
      toast.success("Password updated successfully");
      resetForm();
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.data?.code ||
        "Something went wrong while updating password";

      setStatus({ error: message });
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Update failed");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="text-xl font-semibold pb-4">Change Password</div>
      <Formik<FormValues>
        initialValues={{
          password: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={updatePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid, resetForm, values }) => (
          <Form className=" animate-fadeIn">
            <FormikPassword
              placeholder="Enter Password"
              name="password"
              label="Password"
            />

            <FormikPassword
              placeholder="Enter New Password"
              name="newPassword"
              label="New Password"
            />

            <FormikPassword
              placeholder="Enter Password To Confirm"
              name="confirmPassword"
              label="Confirm Password"
            />

            <div className="flex justify-end gap-6 items-center w-full mt-10">
              <div className="flex gap-6 items-center">
                <DynamicButton
                  text="Reset"
                  variant="danger"
                  isSubmitting={isLoading || values.password.length == 0}
                  onClick={resetForm}
                  type="button"
                />
                <div className="min-w-max">
                  <DynamicButton
                    text={isLoading ? "Updating..." : "Update Password"}
                    variant="submit"
                    isSubmitting={isLoading || !dirty || !isValid}
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePasswordForm;
