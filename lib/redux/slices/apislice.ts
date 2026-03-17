import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      // 🔁 retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  return result;
};

// Base query with token support
const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.2.159:5000/api",
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth, 
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});