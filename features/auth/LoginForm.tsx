"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import {
  MdOutlineMailOutline,
  MdOutlineVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormikInput from "@/components/FormikComponents/FormikInput";
import { handleVisibility } from "@/lib/utils";
import DynamicButton from "@/components/common/DynamicButton";
import LoginLinks from "./loginLinks";
import { useLoginMutation } from "@/lib/redux/slices/authApi";
import { validationSchema } from "@/lib/utilsSchema";

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


function LoginForm({
  initialValues,
  handleForgotPasswordClick,
  setShowOtpForm,
  setUserEmail,
}: Props) {
  const router = useRouter();
  const [type, setType] = useState<"password" | "text">("password");

  const [login, { isLoading ,isError,error}] = useLoginMutation();

  const onSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>
  ) => {
    setUserEmail(values.email);
    setShowOtpForm(false);

    try {
      const data = await login(values).unwrap();

      if (data?.otp === false || data?.accessToken) {
        setShowOtpForm(false);
        document.cookie = `accessToken=${data.accessToken}; path=/`;
        document.cookie = `refreshToken=${data.refreshToken}; path=/`;
        router.push("/dashboard");
        toast.success("Logged in Successfully.");
      } else if (data.otp === true) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setShowOtpForm(true);
        toast.success(data?.message);
      } else {
        toast.error("Login Failed! Try Again.");
      }
      
    } catch (error: any) {
      setShowOtpForm(false);
      toast.error(error?.data?.message || "Login failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
  if (isError) {
    toast.error((error as any)?.data?.message || "Login failed");
    setShowOtpForm(false);
  }
}, [isError, error]);

  return (
    <Formik<LoginValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
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
                sideIcon={<MdOutlineMailOutline className="h-6 w-6" />}
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
                text={isLoading ? "Signing In..." : "Sign In"}
                isSubmitting={isLoading}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default LoginForm;