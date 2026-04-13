
import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  CreateTemplateResponse,
  CreateUserResponse,
  GetCountriesResponse,
  GetReferenceByIdResponse,
  GetReferencesFromWebResponse,
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

    getReferencesFromWeb: builder.query<
      GetReferencesFromWebResponse,
      { search?: string; region?: string; type?: string; page?: number }
    >({
      query: ({ search, region, type, page }) => ({
        url: `/regulatories/products`,
        method: "GET",
        params: { search, region, type, page },
      }),
      keepUnusedDataFor: 0,
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

    previewDocumentByIds: builder.mutation<CreateUserResponse, FormData>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),

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
  useGetReferencesFromWebQuery,
  useLazyGetReferencesFromWebQuery,
  useCreateReferenceMutation,
} = templateApi;
