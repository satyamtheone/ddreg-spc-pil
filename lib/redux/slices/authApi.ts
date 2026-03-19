/* ================= TYPES ================= */

import { apiSlice } from "./apislice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  data: {
    accessToken?: string;
    refreshToken?: string;
    tempToken?: string;
    otp?: boolean;
    message: string;
  };
  message: string;
}

export interface ForgotPasswordResponse {
  success?: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface TwoFactorRequest {
  enabled: boolean;
}


export interface ConfirmForgotPasswordRequest {
  email: string;
  otp: string;
  newPass: string;
}

export interface VerifyOtpRequest {
  tempToken: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/* ================= API ================= */

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Step 1: Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // Step 2: Verify OTP
    verifyOtp: builder.mutation<LoginResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    confirmPassword: builder.mutation<
      ForgotPasswordResponse,
      ConfirmForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/confirmForgotPassword",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body,
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation<LoginResponse, RefreshTokenRequest>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<
      ForgotPasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/auth/changePassword",
        method: "POST",
        body,
      }),
    }),

    twoFactor: builder.mutation<ForgotPasswordResponse, TwoFactorRequest>({
      query: (body) => ({
        url: "/auth/toggle2FA",
        method: "POST",
        body,
      }),
    }),
    autoLogout: builder.mutation<ForgotPasswordResponse, TwoFactorRequest>({
      query: (body) => ({
        url: "/auth/toggleInactivity",
        method: "POST",
        body,
      }),
    }),
    createUser: builder.mutation<ForgotPasswordResponse, TwoFactorRequest>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),
    // Logout
    logout: builder.mutation<void, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useConfirmPasswordMutation,
  useTwoFactorMutation,
  useAutoLogoutMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useCreateUserMutation,
  useLogoutMutation,
} = authApi;
