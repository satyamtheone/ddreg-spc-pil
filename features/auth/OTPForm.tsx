"use client";
import React, { RefObject } from "react";
import { Form, Field, ErrorMessage, Formik, FormikHelpers } from "formik";
import { MdArrowBackIos } from "react-icons/md";
import { POST } from "@/lib/http-methods";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DynamicButton from "@/components/common/DynamicButton";

// ---- TYPES ----
type OtpValues = {
  otp: string;
};

type Props = {
  otpInitialValues: OtpValues;
  userEmail: string;
  otpValues: string[];
  otpRefs: RefObject<(HTMLInputElement | null)[]>;
  handleOtpChange: (
    index: number,
    value: string,
    setFieldValue: (field: string, value: any) => void,
    isPaste?: boolean
  ) => void;
  handleOtpKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    isPaste?: boolean
  ) => void;
  handleresendOtp: () => void;
  resendCooldown: boolean;
  resendSecondsLeft: number;
  handleBackToLogin: () => void;
};

// ---- VALIDATION ----
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

function OTPForm({
  otpInitialValues,
  userEmail,
  otpValues,
  otpRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleresendOtp,
  resendCooldown,
  resendSecondsLeft,
  handleBackToLogin,
}: Props) {
  const router = useRouter();
  // const { refreshSession } = useAuth();

  const onOtpSubmit = async (
    values: OtpValues,
    actions: FormikHelpers<OtpValues>
  ) => {
    const payload = { ...values, email: userEmail };

    try {
      const { data } = await POST("/auth/verify-otp", payload);

      if (data.code === "OTP_VERIFIED") {
        document.cookie = "otp_verified=true; path=/; SameSite=Lax";

        const { token, ...userInfo } = data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // refreshSession();
        toast.success("Logged in Successfully.");
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "OTP verification failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik<OtpValues>
      enableReinitialize
      initialValues={otpInitialValues}
      validationSchema={otpValidationSchema}
      onSubmit={onOtpSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <div className="w-full flex flex-col gap-9 animate-dialog-slide-in">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold md:text-4xl text-2xl">
              Verify Your Account
            </h2>
            <h6>We’ve sent a 6-digit verification code to.</h6>
            <p className="text-cyan-500">{userEmail}</p>
          </div>

          <Form>
            <div className="flex flex-col gap-2">
              <label className="text-base">Enter OTP</label>

              <div className="relative w-full flex gap-2">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (!otpRefs.current) otpRefs.current = [];
                      otpRefs.current[index] = el;
                    }}
                    type="text"
                    className="h-12 text-center p-2.5 w-full rounded-md border border-neutral-200 text-sm shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-600"
                    value={value}
                    onChange={(e) =>
                      handleOtpChange(
                        index,
                        e.target.value,
                        setFieldValue
                      )
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(index, e, setFieldValue)
                    }
                    maxLength={1}
                    autoComplete="off"
                  />
                ))}

                <Field type="hidden" name="otp" value={otpValues.join("")} />

                <div className="absolute -bottom-6">
                  <ErrorMessage
                    name="otp"
                    render={(msg) => (
                      <small className="text-red-500">{msg}</small>
                    )}
                  />
                </div>
              </div>

              <div className="text-base font-semibold flex items-center gap-2 justify-end">
                <small>Didn’t receive the email?</small>

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

            <div className="py-4 pt-10">
              {/* <LoginLinks /> */}
            </div>

            <div className="flex flex-col gap-4 my-4">
              <DynamicButton
                type="submit"
                isSubmitting={isSubmitting}
                text={isSubmitting ? "Verifying..." : "Verify OTP"}
                variant="outline"
              />

              <DynamicButton
                type="button"
                isSubmitting={isSubmitting}
                text="Back to Login"
                variant="submit"
                icon={<MdArrowBackIos className="h-5 w-5 text-white" />}
                onClick={handleBackToLogin}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default OTPForm;