/* ================= API ================= */

import {
  MeResponse,
  UpdatePreferencesPayload,
  UpdatePreferencesResponse,
  User,
  UsersResponse,
} from "../apiTypes";
import { apiSlice } from "./apislice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get logged-in user
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    // 🔹updatePreferences
    updatePreferences: builder.mutation<
      UpdatePreferencesResponse,
      UpdatePreferencesPayload
    >({
      query: (body) => ({
        url: "/users/updatePreferences",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    // 🔹 Get all users
    getUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // 🔹 Get user by ID
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdatePreferencesMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
} = userApi;
