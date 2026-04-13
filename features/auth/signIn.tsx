"use client";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import image from "../../public/auth/mainLogo.svg";
import { POST } from "@/lib/http-methods";
import Image from "next/image";
import ForgotPasswordOTPForm from "./ForgotPasswordOTPForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OTPForm from "./OTPForm";
import LoginForm from "./LoginForm";
import { useAuth } from "@/lib/AuthProvider";
import { useNavigation } from "@/components/hooks/useNavigation";

// ---- TYPES ----
type OtpArray = string[];

function SignIn() {
  const { isAuthenticated, isUserLoading } = useAuth();
  const { goTo } = useNavigation();

  useEffect(() => {
    if (!isUserLoading && isAuthenticated) {
      goTo("/dashboard");
    }
  }, [isAuthenticated, isUserLoading]);

  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showForgotOtpForm, setShowForgotOtpForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const [otpValues, setOtpValues] = useState<OtpArray>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [forgotOtpValues, setForgotOtpValues] = useState<OtpArray>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const forgotOtpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ---- RESEND ----
  const RESEND_COOLDOWN_SECONDS = 30;
  const [resendCooldown, setResendCooldown] = useState(false);
  const [resendSecondsLeft, setResendSecondsLeft] = useState(0);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
      }
    };
  }, []);

  // ---- INITIAL VALUES ----
  const initialValues = {
    email: userEmail || "",
    password: "",
  };

  const otpInitialValues = { otp: "" };

  const forgotPasswordInitialValues = {
    email: forgotPasswordEmail || userEmail || "",
  };

  const forgotOtpInitialValues = {
    otp: "",
    email: "",
    newPass: "",
    password: "",
  };

  // ---- OTP CHANGE ----
  const handleOtpChange = (
    index: number,
    value: string,
    setFieldValue: (field: string, value: any) => void,
    isForForgot = false,
  ) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const currentOtpValues = isForForgot ? forgotOtpValues : otpValues;
    const setOtpValuesFunction = isForForgot
      ? setForgotOtpValues
      : setOtpValues;

    const newOtpValues = [...currentOtpValues];
    newOtpValues[index] = value;
    setOtpValuesFunction(newOtpValues);

    setFieldValue("otp", newOtpValues.join(""));

    if (value && index < 5) {
      const refs = isForForgot ? forgotOtpRefs : otpRefs;
      refs.current[index + 1]?.focus();
    }
  };

  // ---- OTP KEYDOWN ----
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    isForForgot = false,
  ) => {
    const currentOtpValues = isForForgot ? forgotOtpValues : otpValues;
    const refs = isForForgot ? forgotOtpRefs : otpRefs;
    const setOtpValuesFunction = isForForgot
      ? setForgotOtpValues
      : setOtpValues;

    if (e.key === "Backspace" && !currentOtpValues[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }

    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();

      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6);
        const newOtpValues = [...currentOtpValues];

        for (let i = 0; i < 6; i++) {
          newOtpValues[i] = digits[i] || "";
        }

        setOtpValuesFunction(newOtpValues);
        setFieldValue("otp", newOtpValues.join(""));

        const lastIndex = Math.min(digits.length - 1, 5);
        refs.current[lastIndex]?.focus();
      });
    }
  };

  // ---- BACK ----
  const handleBackToLogin = () => {
    setShowOtpForm(false);
    setShowForgotPasswordForm(false);
    setShowForgotOtpForm(false);
    setShowResetPasswordForm(false);

    setUserEmail("");
    setForgotPasswordEmail("");

    setOtpValues(["", "", "", "", "", ""]);
    setForgotOtpValues(["", "", "", "", "", ""]);
  };

  // ---- RESEND OTP ----
  const handleresendOtp = async () => {
    if (resendCooldown) return;

    const emailToSend = forgotPasswordEmail || userEmail;
    if (!emailToSend) {
      toast.error("No email found to resend OTP.");
      return;
    }

    setResendCooldown(true);
    setResendSecondsLeft(RESEND_COOLDOWN_SECONDS);

    try {
      await POST("/auth/forgotPassword", {
        email: emailToSend,
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend OTP");
      setResendCooldown(false);
      setResendSecondsLeft(0);
      return;
    }

    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
    }

    resendTimerRef.current = setInterval(() => {
      setResendSecondsLeft((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
          }
          setResendCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ---- FORGOT ----
  const handleForgotPasswordClick = (email: string) => {
    setShowForgotPasswordForm(true);
    setForgotPasswordEmail(email || "");
    setUserEmail(email || "");
  };

  // ---- FORM SWITCH ----
  const getCurrentForm = () => {
    if (showResetPasswordForm) return "reset-password";
    if (showForgotOtpForm) return "forgot-otp";
    if (showForgotPasswordForm) return "forgot-password";
    if (showOtpForm) return "otp";
    return "login";
  };

  const renderForm = () => {
    switch (getCurrentForm()) {
      case "login":
        return (
          <LoginForm
            initialValues={initialValues}
            handleForgotPasswordClick={handleForgotPasswordClick}
            setShowOtpForm={setShowOtpForm}
            setUserEmail={setUserEmail}
          />
        );

      case "otp":
        return (
          <OTPForm
            otpInitialValues={otpInitialValues}
            userEmail={userEmail}
            otpValues={otpValues}
            otpRefs={otpRefs}
            handleOtpChange={handleOtpChange}
            handleOtpKeyDown={handleOtpKeyDown}
            handleresendOtp={handleresendOtp}
            resendCooldown={resendCooldown}
            resendSecondsLeft={resendSecondsLeft}
            handleBackToLogin={handleBackToLogin}
          />
        );

      case "forgot-password":
        return (
          <ForgotPasswordForm
            handleBackToLogin={handleBackToLogin}
            forgotPasswordInitialValues={forgotPasswordInitialValues}
            setShowForgotOtpForm={setShowForgotOtpForm}
            setForgotPasswordEmail={setForgotPasswordEmail}
          />
        );

      case "forgot-otp":
        return (
          <ForgotPasswordOTPForm
            forgotOtpInitialValues={forgotOtpInitialValues}
            forgotPasswordEmail={forgotPasswordEmail}
            forgotOtpValues={forgotOtpValues}
            forgotOtpRefs={forgotOtpRefs}
            handleOtpChange={handleOtpChange}
            handleOtpKeyDown={handleOtpKeyDown}
            handleresendOtp={handleresendOtp}
            resendCooldown={resendCooldown}
            resendSecondsLeft={resendSecondsLeft}
            handleBackToLogin={handleBackToLogin}
            setShowResetPasswordForm={setShowResetPasswordForm}
          />
        );

      default:
        return <p>...Oops</p>;
    }
  };

  return (
    <div className="flex flex-col justify-center w-full items-center gap-7">
      <div className="flex justify-start w-full">
        <Image priority src={image} alt="login image" />
      </div>
      <div className="overflow-hidden w-full p-1">{renderForm()}</div>
    </div>
  );
}

export default SignIn;