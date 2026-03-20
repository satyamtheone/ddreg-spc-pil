/* ================= API ================= */

import {
  CreateROleRequest,
  CreateRoleResponse,
  CreateUserResponse,
  GetPermissionsResponse,
  GetRolesResponse,
  GetUserResponse,
  MeResponse,
  UpdatePreferencesPayload,
  UpdatePreferencesResponse,
  UpdateRoleRequest,
  UpdateUserRequest,
  User,
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

    getRolePermissions: builder.query<GetPermissionsResponse, void>({
      query: () => ({
        url: "/roles/permissions",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    getRoles: builder.query<GetRolesResponse, void>({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    createRole: builder.mutation<CreateRoleResponse, CreateROleRequest>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
    }),

    updateRole: builder.mutation<CreateRoleResponse, UpdateRoleRequest>({
      query: ({ id, body }) => ({
        url: `/roles/${id}/permissions`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getUsers: builder.query<GetUserResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    createUser: builder.mutation<CreateUserResponse, FormData>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),

    updateUser: builder.mutation<CreateUserResponse, UpdateUserRequest>({
      query: ({ id, body }) => ({
        url: `/users/user/2adb8de5-713d-4824-b6de-a26f141dd88e`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
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
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetRolePermissionsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = userApi;
