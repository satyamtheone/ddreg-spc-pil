"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import mainApiCaller from "@/lib/apis/apicaller";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import OTPInput from "./OTPInput";
import { Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  otp: z.string().min(1, { message: "OTP is required" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const AuthForm: React.FC = () => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const [authState, setAuthState] = useState("login");
  const [userId, setUserId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [forgotResendTimer, setForgotResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isForgotResendDisabled, setIsForgotResendDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: any) => {
    startTransition(() => {
      const email = form.getValues("email");
      const password = form.getValues("password");
      const requestData = { email, password };
      toast.promise(mainApiCaller("/api/login", "POST", requestData), {
        loading: "Logging in...",
        success: (response: any) => {
          const user = response;
          if (user && user.twoFactorRequired) {
            setUserId(user.userId);
            setAuthState("otp");
            return "OTP sent successfully.";
          } else {
            localStorage.setItem("user", JSON.stringify(response.res));
            router.push("/dashboard");
            return "Login Successful";
          }
        },
        error: (error: any) => error.message || "Something broke!",
      });
    });
  };

  const handleVerifyOTP = async () => {
    startTransition(() => {
      const otp = form.getValues("otp");
      toast.promise(
        mainApiCaller("/api/verify-otp", "POST", {
          userId,
          otp,
        }),
        {
          loading: "Verifying OTP...",
          success: (data) => {
            localStorage.setItem("user", JSON.stringify(data.res));
            router.push("/dashboard");
            return data.message || "Login Successful";
          },
          error: (error) => error.message || "Something broke!",
        },
      );
    });
  };

  const handleForgotPassword = async () => {
    startTransition(() => {
      const email = form.getValues("email");
      toast.promise(mainApiCaller("/api/forgot-password", "POST", { email }), {
        loading: "Sending OTP...",
        success: (data) => {
          setUserId(data.userId);
          setAuthState("forgot-otp");
          setOtp("");
          return data.message || "OTP Sent!";
        },
        error: (error) => error.message || "Something broke!",
      });
    });
  };

  const handleVerifyForgotOTP = async () => {
    startTransition(() => {
      const otp = form.getValues("otp");
      toast.promise(
        mainApiCaller("/api/verify-forgot-password-otp", "POST", {
          userId,
          otp,
        }),
        {
          loading: "Verifying OTP...",
          success: (data) => {
            setAuthState("reset-password");
            return data.message || "OTP Verified";
          },
          error: (error) => error.message || "Something broke!",
        },
      );
    });
  };

  const handleUpdatePassword = async () => {
    startTransition(() => {
      const newPassword = form.getValues("newPassword");
      toast.promise(
        mainApiCaller("/api/update-password", "POST", {
          userId,
          newPassword,
        }),
        {
          loading: "Updating Password...",
          success: (data) => {
            setAuthState("login");
            return data.message || "Password Updated";
          },
          error: (error) => error.message || "Something broke!",
        },
      );
    });
  };

  const handleResendOTP = async () => {
    if (isResendDisabled) return;

    startTransition(() => {
      toast.promise(mainApiCaller("/api/resend-otp", "POST", { userId }), {
        loading: "Resending OTP...",
        success: (data) => {
          setIsResendDisabled(true);
          setResendTimer(30);
          return data.message || "OTP Resent";
        },
        error: (error) => error.message || "Something broke!",
      });
    });
  };

  const handleResendForgotPasswordOTP = async () => {
    if (isForgotResendDisabled) return;

    startTransition(() => {
      toast.promise(
        mainApiCaller("/api/resend-forgot-password-otp", "POST", { userId }),
        {
          loading: "Resending OTP...",
          success: (data) => {
            setIsForgotResendDisabled(true);
            setForgotResendTimer(30);
            return data.message || "OTP Resent";
          },
          error: (error) => error.message || "Something broke!",
        },
      );
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (forgotResendTimer > 0) {
      timer = setTimeout(
        () => setForgotResendTimer(forgotResendTimer - 1),
        1000,
      );
    } else if (forgotResendTimer === 0) {
      setIsForgotResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [forgotResendTimer]);

  useEffect(() => {
    if (authState === "otp" && !isResendDisabled) {
      setIsResendDisabled(true);
      setResendTimer(30);
    }
  }, [authState]);

  useEffect(() => {
    if (authState === "forgot-otp" && !isForgotResendDisabled) {
      setIsForgotResendDisabled(true);
      setForgotResendTimer(30);
    }
  }, [authState]);

  const getFormContent = () => {
    switch (authState) {
      case "login":
        return (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-gray-300">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        disabled={loading}
                        {...field}
                        className={`pr-10 ${form.formState.errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"}`}
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        disabled={loading}
                        {...field}
                        className={`pr-12 ${form.formState.errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:hover:text-gray-300 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p
              className="text-sm text-theme-secondary cursor-pointer text-end pb-4"
              onClick={() => setAuthState("forgot")}
            >
              Forgot Password?
            </p>

            {getFooter()}

            <Button
              disabled={loading}
              variant="gradient"
              className="w-full font-semibold py-5 px-4 rounded-md"
              type="submit"
              onClick={() => handleLogin(form.getValues())}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4 text-white" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">Sign In</span>
              )}
            </Button>
          </>
        );

      case "otp":
        return (
          <>
            <FormItem>
              <FormLabel className="text-black dark:text-gray-300">
                Enter OTP
              </FormLabel>
              <FormControl>
                <OTPInput
                  length={6}
                  value={otp}
                  setValue={setOtp}
                  onChange={(value) => {
                    setOtp(value);
                    form.setValue("otp", value);
                  }}
                  onComplete={handleVerifyOTP}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="text-right pb-4">
              <span className="text-sm text-black">
                Didn't receive the email?{" "}
              </span>
              {isResendDisabled ? (
                <span className="text-sm font-semibold text-gray-400">
                  Resend Email ({resendTimer}s)
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResendOTP()}
                  disabled={loading || isResendDisabled}
                  className={`text-sm font-semibold ${
                    isResendDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-theme-sky hover:text-blue-600 transition-colors"
                  }`}
                >
                  Resend Email
                </button>
              )}
            </div>

            {getFooter()}

            <Button
              variant="outline"
              disabled={loading}
              className="w-full border-gray-300 text-sm font-semibold bg-gradient-hover transition-colors hover:border-transparent cursor-pointer py-5 hover:text-white"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </Button>
          </>
        );

      case "forgot":
        return (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        disabled={loading}
                        {...field}
                        className={`pr-10 ${form.formState.errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"}`}
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {getFooter()}

            <Button
              variant="outline"
              disabled={loading}
              className="w-full border-gray-300 text-sm font-semibold bg-gradient-hover transition-colors hover:border-transparent cursor-pointer py-5 hover:text-white"
              onClick={() => handleForgotPassword()}
            >
              Send OTP
            </Button>
          </>
        );

      case "forgot-otp":
        return (
          <>
            <FormItem>
              <FormLabel className="text-black dark:text-gray-300">
                OTP
              </FormLabel>
              <FormControl>
                <OTPInput
                  length={6}
                  value={otp}
                  setValue={setOtp}
                  onChange={(value) => {
                    setOtp(value);
                    form.setValue("otp", value);
                  }}
                  onComplete={handleVerifyForgotOTP}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="text-right pb-4">
              <span className="text-sm text-black">
                Didn't receive the email?{" "}
              </span>
              {isForgotResendDisabled ? (
                <span className="text-sm font-semibold text-gray-400">
                  Resend Email ({forgotResendTimer}s)
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResendForgotPasswordOTP()}
                  disabled={loading || isForgotResendDisabled}
                  className={`text-sm font-semibold ${
                    isForgotResendDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-theme-sky hover:text-blue-600 transition-colors"
                  }`}
                >
                  Resend Email
                </button>
              )}
            </div>

            {getFooter()}

            <Button
              variant="outline"
              disabled={loading}
              className="w-full border-gray-300 text-sm font-semibold bg-gradient-hover transition-colors hover:border-transparent cursor-pointer py-5 hover:text-white"
              onClick={() => handleVerifyForgotOTP()}
            >
              Verify OTP
            </Button>
          </>
        );

      case "reset-password":
        return (
          <>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-gray-300">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        disabled={loading}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        {...field}
                        className={`pr-12 ${form.formState.errors.newPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:hover:text-gray-300 cursor-pointer"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-gray-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        disabled={loading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        {...field}
                        className={`pr-12 ${form.formState.errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:hover:text-gray-300 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {getFooter()}

            <Button
              variant="outline"
              disabled={loading}
              className="w-full border-gray-300 text-sm font-semibold bg-gradient-hover transition-colors hover:border-transparent cursor-pointer py-5 hover:text-white"
              onClick={handleUpdatePassword}
            >
              Update
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  const getHeader = () => {
    switch (authState) {
      case "login":
        return (
          <motion.div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-medium dark:text-white mb-2">
              Login to Your Account
            </h1>
            <p className="text-theme-secondary">Please sign in to continue</p>
          </motion.div>
        );
      case "otp":
        return (
          <motion.div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-medium dark:text-white mb-2">
              Verify Your Account
            </h1>
            <p className="text-theme-secondary">
              We've sent a 6-digit verification code to your email.<br />
            <span className="text-theme-sky text-base">
              {form.getValues("email")}
            </span>
            </p>
          </motion.div>
        );
      case "forgot":
        return (
          <motion.div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-medium dark:text-white mb-2">
              Account Recovery
            </h1>
            <p className="text-theme-secondary">
              Enter your email address to receive a verification link to reset
              your password.
            </p>
          </motion.div>
        );
      case "forgot-otp":
        return (
          <motion.div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-medium dark:text-white mb-2">
              Verify Your Account
            </h1>
            <p className="text-theme-secondary">
              We've sent a 6-digit verification code to your email.<br />
            <span className="text-theme-sky text-base">
              {form.getValues("email")}
            </span>
            </p>
          </motion.div>
        );
      case "reset-password":
        return (
          <motion.div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-medium dark:text-white mb-2">
              Change Password
            </h1>
            <p className="text-theme-secondary">
              Enter your new password below. Make sure it is strong and
              different from your previous password to keep your account secure.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getFooter = () => {
    return (
      <div className="py-2">
        <p className="text-center text-sm text-theme-secondary">
          By continuing, you agree to DDReg Pharma's
          <br />
          <Link
            href="/privacy-policy"
            className="underline underline-offset-4 text-theme-sky transition-colors"
          >
            Privacy Policy
          </Link>
          {", "}
          <Link
            href="/cookie-policy"
            className="underline underline-offset-4 text-theme-sky transition-colors"
          >
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-and-conditions"
            className="underline underline-offset-4 text-theme-sky transition-colors"
          >
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    );
  };

  const handleBack = () => {
    if (
      authState === "otp" ||
      authState === "forgot-otp" ||
      authState === "reset-password"
    ) {
      setAuthState("login");
      setUserId(null);
      setOtp("");
    } else if (authState === "forgot") {
      setAuthState("login");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, document.title, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, document.title, window.location.href);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, []);

  return (
    <Card noborder className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 text-sm text-theme-secondary">
      <div className="mb-6">
        <div className="flex mb-4">
          <Image
            src="/auth/Icon-03.svg"
            alt="SPC-PIL Logo"
            width={100}
            height={48}
          />
        </div>
        {getHeader()}
      </div>

      <Form {...form}>
        <form
          onSubmit={
            authState === "login"
              ? form.handleSubmit(handleLogin)
              : (e) => e.preventDefault()
          }
          className="w-full space-y-3"
        >
          <div className="w-full space-y-3">{getFormContent()}</div>

          {authState !== "login" && (
            <Button
              className="w-full text-white hover:text-white rounded-md py-5 cursor-pointer"
              onClick={handleBack}
              variant="gradient"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Button>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default AuthForm;
