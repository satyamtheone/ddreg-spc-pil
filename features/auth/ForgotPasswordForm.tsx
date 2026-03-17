"use client";
import * as Yup from "yup";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { MdArrowBackIos } from "react-icons/md";
import { POST } from "@/lib/http-methods";
import toast from "react-hot-toast";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";

interface ForgotPasswordValues {
  email: string;
}

interface ForgotPasswordFormProps {
  forgotPasswordInitialValues: ForgotPasswordValues;
  handleBackToLogin: () => void;
  setShowForgotOtpForm: (value: boolean) => void;
  setForgotPasswordEmail: (email: string) => void;
}

const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

function ForgotPasswordForm({
  forgotPasswordInitialValues,
  handleBackToLogin,
  setShowForgotOtpForm,
  setForgotPasswordEmail,
}: ForgotPasswordFormProps) {
  const onForgotPasswordSubmit = async (
    values: ForgotPasswordValues,
    actions: FormikHelpers<ForgotPasswordValues>
  ) => {
    setForgotPasswordEmail(values.email);

    try {
      const { data } = await POST("/auth/sent-otp", values);

      if (data.code === "OTP_SENT") {
        setShowForgotOtpForm(true);
        actions.setSubmitting(false);
        toast.success(
          data.message || "OTP sent to your email successfully."
        );
      } else {
        actions.setSubmitting(false);
        toast.error(data.message || "Failed to send OTP. Try Again.");
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik<ForgotPasswordValues>
      enableReinitialize
      initialValues={forgotPasswordInitialValues}
      validationSchema={forgotPasswordValidationSchema}
      onSubmit={onForgotPasswordSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex flex-col gap-4 animate-dialog-slide-in">
            <div>
              <h2 className="font-semibold text-capitalize md:text-4xl text-2xl">
                Forgot Password
              </h2>
              <h6 className="font-weight-semibold">
                Enter your email address and we'll send you an OTP to reset your
                password.
              </h6>
            </div>

            <FormikInput
              placeholder="Enter your email"
              type="email"
              name="email"
              label="Email"
            />

            <div className="flex flex-col gap-4 my-4">
              <DynamicButton
                type="submit"
                variant="outline"
                isSubmitting={isSubmitting}
                text={isSubmitting ? "Sending OTP..." : "Send OTP"}
              />

              <DynamicButton
                type="button"
                variant="submit"
                isSubmitting={isSubmitting}
                onClick={handleBackToLogin}
                text="Back to Login"
                icon={<MdArrowBackIos className="h-5 w-5 text-white" />}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;