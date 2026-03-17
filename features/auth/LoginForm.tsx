"use client";
import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { POST } from "@/lib/http-methods";
import {
  MdOutlineMailOutline,
  MdOutlineVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormikInput from "@/components/FormikComponents/FormikInput";
import { handleVisibility } from "@/lib/utils";
import DynamicButton from "@/components/common/DynamicButton";
import LoginLinks from "./loginLinks";

// ---- TYPES ----
type LoginValues = {
  email: string;
  password: string;
};

type Props = {
  initialValues: LoginValues;
  handleForgotPasswordClick: (email: string) => void;
  setShowOtpForm: (val: boolean) => void;
  setUserEmail: (email: string) => void;
};

// ---- VALIDATION ----
const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Number and One Special Case Character"
    ),
});

function LoginForm({
  initialValues,
  handleForgotPasswordClick,
  setShowOtpForm,
  setUserEmail,
}: Props) {
  // const { refreshSession } = useAuth();
  const router = useRouter();
  const [type, setType] = useState<"password" | "text">("password");

  const onSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>
  ) => {
    setUserEmail(values.email);
    setShowOtpForm(false);

    try {
      // const { data } = await POST("/auth/login", values);

      // if (data.code === "FETCHED") {
      //   setShowOtpForm(false);

      //   const { token, ...userInfo } = data;
      //   localStorage.setItem("userInfo", JSON.stringify(userInfo));

      //   // refreshSession();

      //   if (data?.user?.twoFactor === false) {
      //     document.cookie = "otp_verified=true; path=/; SameSite=Lax";
      //     router.push("/dashboard");
      //   }

      //   toast.success("Logged in Successfully.");
      // } else if (data.code === "OTP_SENT") {
      //   setShowOtpForm(true);
      //   toast.success(data.message);
      // } else {
      //   toast.error("Login Failed! Try Again.");
      // }
      router.push("/dashboard")
    } catch (error: any) {
      setShowOtpForm(false);
      toast.error(error?.message || "Login failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik<LoginValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values }) => (
        <div className="w-full flex flex-col gap-9 animate-dialog-slide-in">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold md:text-4xl text-2xl">
            Login to Your Account
            </h2>
            <h6>Please sign in to continue.</h6>
          </div>

          <Form>
            <div>
              <FormikInput
                name="email"
                type="email"
                placeholder="Enter Email Address"
                label="Email"
                sideIcon={
                  <MdOutlineMailOutline className="h-6 w-6" />
                }
              />

              <FormikInput
                name="password"
                type={type}
                placeholder="password"
                label="Password"
                sideIcon={
                  <span onClick={() => handleVisibility(type, setType)}>
                    {type === "password" ? (
                      <MdVisibilityOff className="h-6 w-6 cursor-pointer" />
                    ) : (
                      <MdOutlineVisibility className="h-6 w-6 cursor-pointer" />
                    )}
                  </span>
                }
              />
            </div>

            <div className="flex justify-end mb-3 mt-2">
              <button
                type="button"
                className="btn btn-link p-0 text-cyan-500 font-semibold"
                onClick={() =>
                  handleForgotPasswordClick(values.email)
                }
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <LoginLinks />

              <DynamicButton
                variant="submit"
                text={isSubmitting ? "Signing In..." : "Sign In"}
                isSubmitting={isSubmitting}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default LoginForm;