
import {
  CreateTemplateResponse,
  GetCountriesResponse,
  GetReferenceByIdResponse,
  GetReferencesResponse,
  GetTemplateByIdResponse,
  GetTemplatesResponse,
} from "../apiTypes";
import { apiSlice } from "./apislice";

export const templateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<GetCountriesResponse, void>({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
      providesTags: ["getCountries"],
    }),

    getTemplates: builder.query<
      GetTemplatesResponse,
      { title?: string; country?: string; type?: string }
    >({
      query: ({ title, country, type }) => ({
        url: "/templates",
        method: "GET",
        params: { title, country, type },
      }),
      providesTags: ["getTemplates"],
    }),

    createTemplate: builder.mutation<CreateTemplateResponse, FormData>({
      query: (body) => ({
        url: "/templates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getTemplates"],
    }),

    getTemplateById: builder.query<GetTemplateByIdResponse, string>({
      query: (id) => ({
        url: `/templates/${id}`,
        method: "GET",
      }),
    }),

    getReferences: builder.query<
      GetReferencesResponse,
      { title?: string; country?: string; type?: string }
    >({
      query: ({ title, country, type }) => ({
        url: `/references`,
        method: "GET",
        params: { title, country, type },
      }),
      providesTags: ["getReferences"],
    }),

    getReferenceById: builder.query<GetReferenceByIdResponse, string>({
      query: (id) => ({
        url: `/references/${id}`,
        method: "GET",
      }),
    }),

    createReference: builder.mutation<CreateTemplateResponse, FormData>({
      query: (body) => ({
        url: `/references`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getReferences"],
    }),
    // 🔹updatePreferences
    // updatePreferences: builder.mutation<
    //   UpdatePreferencesResponse,
    //   UpdatePreferencesPayload
    // >({
    //   query: (body) => ({
    //     url: "/users/updatePreferences",
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: ["Me"],
    // }),

    // createRole: builder.mutation<CreateRoleResponse, CreateROleRequest>({
    //   query: (body) => ({
    //     url: "/roles",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    // updateRole: builder.mutation<CreateRoleResponse, UpdateRoleRequest>({
    //   query: ({ id, body }) => ({
    //     url: `/roles/${id}/permissions`,
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    // deleteRole: builder.mutation({
    //   query: (id) => ({
    //     url: `/roles/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetTemplatesQuery,
  useCreateTemplateMutation,
  useGetTemplateByIdQuery,
  useGetReferenceByIdQuery,
  useGetReferencesQuery,
  useCreateReferenceMutation,
} = templateApi;
