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
      providesTags: ["Me"],
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
      invalidatesTags: ["Me"],
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
      invalidatesTags: ["Auth"],
    }),

    updateRole: builder.mutation<CreateRoleResponse, UpdateRoleRequest>({
      query: ({ id, body }) => ({
        url: `/roles/${id}/permissions`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
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
      invalidatesTags: ["Auth"],
    }),

    updateUser: builder.mutation<CreateUserResponse, UpdateUserRequest>({
      query: ({ id, body }) => ({
        url: `/users/user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Auth"],
      },
    ),
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
  useLazyGetMeQuery,
  useUpdatePreferencesMutation,
  useGetUsersQuery,
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetRolePermissionsQuery,
  useDeleteRoleMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = userApi;
