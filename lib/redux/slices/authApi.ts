
/* ================= TYPES ================= */

import { apiSlice } from "./apislice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  tempToken?: string;
  otp?:boolean;
  message:string;
}

export interface VerifyOtpRequest {
  tempToken: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
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

    // Refresh Token
    refreshToken: builder.mutation<
      LoginResponse,
      RefreshTokenRequest
    >({
      query: (body) => ({
        url: "/auth/refresh",
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

/* ================= HOOKS ================= */

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;