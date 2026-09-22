"use client";

import React, { RefObject, useEffect } from "react";
import { Form, Field, ErrorMessage, Formik, FormikHelpers } from "formik";
import { MdArrowBackIos } from "react-icons/md";
import toast from "react-hot-toast";
import * as Yup from "yup";
import DynamicButton from "@/components/common/DynamicButton";
import { useConfirmPasswordMutation } from "@/lib/redux/slices/authApi";
import { passwordRules } from "@/lib/utilsSchema";
import FormikPassword from "@/components/FormikComponents/FormikPassword";

// ---- TYPES ----
export type OtpValues = {
  email: string;
  otp: string;
  newPass: string;
};

type Props = {
  forgotOtpInitialValues: OtpValues;
  forgotPasswordEmail: string;
  forgotOtpValues: string[];
  forgotOtpRefs: RefObject<(HTMLInputElement | null)[]>;
  handleOtpChange: (
    index: number,
    value: string,
    setFieldValue: (field: string, value: any) => void,
    isForForgot?: boolean,
  ) => void;
  handleOtpKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    isForForgot?: boolean,
  ) => void;
  handleresendOtp: () => void;
  resendCooldown: boolean;
  resendSecondsLeft: number;
  handleBackToLogin: () => void;
  setShowResetPasswordForm: (val: boolean) => void;
};

// ---- VALIDATION ----
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
  newPass: passwordRules.required(),
  password: passwordRules.oneOf([Yup.ref("newPass")], "Passwords must match"),
});

function ForgotPasswordOTPForm({
  forgotOtpInitialValues,
  forgotPasswordEmail,
  forgotOtpValues,
  forgotOtpRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleresendOtp,
  resendCooldown,
  resendSecondsLeft,
  handleBackToLogin,
}: Props) {
  const [confirmPassword, { isLoading, isError, error }] =
    useConfirmPasswordMutation();
  const onForgotOtpSubmit = async (
    values: OtpValues,
    actions: FormikHelpers<OtpValues>,
  ) => {
    const payload = {
      otp: values.otp,
      email: forgotPasswordEmail,
      newPass: values.newPass,
    };

    try {
      const data = await confirmPassword(payload).unwrap();
      if (data.success) {
        handleBackToLogin();
        toast.success(data.message || "Password Changed successfully.");
      } else {
        toast.error(data.message || "Invalid Password. Try Again.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Invalid Password. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Login failed");
      handleBackToLogin();
    }
  }, [isError, error]);

  return (
    <Formik<OtpValues>
      enableReinitialize
      initialValues={forgotOtpInitialValues}
      validationSchema={otpValidationSchema}
      onSubmit={onForgotOtpSubmit}
    >
      {({ isSubmitting, setFieldValue, isValid, dirty }) => (
        <Form className="w-full flex flex-col gap-4 animate-dialog-slide-in">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold md:text-4xl text-2xl">Verify OTP</h2>
            <h6>We've sent a 6-digit verification code to</h6>
            <p className="text-cyan-500">{forgotPasswordEmail}</p>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-base">Enter OTP</label>

            <div className="relative w-full flex gap-2">
              {forgotOtpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (!forgotOtpRefs.current) forgotOtpRefs.current = [];
                    forgotOtpRefs.current[index] = el;
                  }}
                  type="text"
                  className="md:h-12 h-9 text-center p-2.5 w-full rounded-md border border-neutral-200 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-600"
                  value={value}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value, setFieldValue, true)
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(index, e, setFieldValue, true)
                  }
                  maxLength={1}
                  autoComplete="off"
                />
              ))}

              <Field
                type="hidden"
                name="otp"
                value={forgotOtpValues.join("")}
              />

              <div className="absolute -bottom-6">
                <ErrorMessage
                  name="otp"
                  render={(msg) => (
                    <small className="text-red-500">{msg}</small>
                  )}
                />
              </div>
            </div>

            <div className="text-base font-semibold text-end">
              <small>Didn’t receive the email? </small>

              <button
                type="button"
                className="text-cyan-500"
                onClick={handleresendOtp}
                disabled={resendCooldown}
              >
                {resendCooldown
                  ? `Resend in ${resendSecondsLeft}s`
                  : "Resend Email"}
              </button>
            </div>
          </div>

          <div>
            <FormikPassword name="newPass" label="Confirm Password " />
            <FormikPassword name="password" label="New Password" />
          </div>

          <div className="flex flex-col gap-2 my-4">
            <DynamicButton
              type="submit"
              isSubmitting={isLoading || isSubmitting || !dirty || !isValid}
              text={isSubmitting ? "Updating..." : "Update Password"}
              variant="outline"
            />

            <DynamicButton
              type="button"
              isSubmitting={isSubmitting || isLoading}
              text="Back to Login"
              variant="submit"
              icon={<MdArrowBackIos className="h-5 w-5 text-white" />}
              onClick={handleBackToLogin}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordOTPForm;