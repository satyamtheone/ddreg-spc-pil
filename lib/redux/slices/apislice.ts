import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

/* ================= MUTEX ================= */

const mutex = new Mutex();

/* ================= COOKIE HELPERS ================= */

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
};

const setCookie = (name: string, value: string, days = 1) => {
  if (typeof document === "undefined") return;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; Max-Age=0; path=/`;
};

/* ================= BASE QUERY ================= */

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_PROD_URL,
  prepareHeaders: (headers) => {
    const token = getCookie("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    (args as FetchArgs).url !== "/auth/refresh"
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = getCookie("refreshToken");

        // ❌ No refresh token → logout
        if (!refreshToken) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
          return result;
        }

        // 🔁 Call refresh API
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const data: any = refreshResult?.data;

          const newAccessToken = data?.data?.accessToken;
          const newRefreshToken = data?.data?.refreshToken;

          // ✅ Save new tokens
          setCookie("accessToken", newAccessToken, 1);
          if (newRefreshToken) {
            setCookie("refreshToken", newRefreshToken, 15);
          }

          // 🔁 Retry original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // ❌ Refresh failed → logout
          deleteCookie("accessToken");
          deleteCookie("refreshToken");

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Me",
    "getCountries",
    "getTemplates",
    "getReferences",
    "getDocuments",
    "getTasks",
  ],
  endpoints: () => ({}),
});