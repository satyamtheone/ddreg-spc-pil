"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { MdArrowBackIos } from "react-icons/md";
import { POST } from "@/lib/http-methods";
import toast from "react-hot-toast";
import * as Yup from "yup";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";

// ---- TYPES ----
type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

type Props = {
  handleBackToLogin: () => void;
  resetPasswordInitialValues: ResetPasswordValues;
  forgotPasswordEmail: string;
};

// ---- VALIDATION ----
const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function ResetPasswordForm({
  handleBackToLogin,
  resetPasswordInitialValues,
  forgotPasswordEmail,
}: Props) {
  const onResetPasswordSubmit = async (
    values: ResetPasswordValues,
    actions: FormikHelpers<ResetPasswordValues>
  ) => {
    const payload = {
      email: forgotPasswordEmail,
      newPassword: values.password,
    };

    try {
      const { data } = await POST("/auth/forget-password", payload);

      if (data.code === "UPDATED") {
        toast.success(data.message || "Password reset successfully.");
        handleBackToLogin();
      } else {
        toast.error(data.message || "Failed to reset password. Try Again.");
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to reset password. Please try again."
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik<ResetPasswordValues>
      enableReinitialize
      initialValues={resetPasswordInitialValues}
      validationSchema={resetPasswordValidationSchema}
      onSubmit={onResetPasswordSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full flex flex-col gap-4 animate-slide-in">
          <div>
            <h2 className="font-semibold md:text-4xl text-2xl">
              Reset Password
            </h2>
            <h6>Enter your new password below.</h6>
          </div>

          <div>
            <FormikInput
              type="password"
              name="password"
              label="New Password"
              placeholder="Enter new password"
            />

            <FormikInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex flex-col gap-2 my-4">
            <DynamicButton
              type="submit"
              variant="outline"
              isSubmitting={isSubmitting}
              text={isSubmitting ? "Resetting..." : "Reset Password"}
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
        </Form>
      )}
    </Formik>
  );
}

export default ResetPasswordForm;