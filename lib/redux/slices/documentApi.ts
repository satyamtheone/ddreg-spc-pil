import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  GetDocumentResponse,
  GetTemplatesResponse,
  PreviewDocumentRequest,
  PreviewDocumentResponse,
} from "../apiTypes";
import { apiSlice } from "./apislice";

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocument: builder.query<
      GetDocumentResponse,
      { search?: string; country?: string; type?: string; page?: number }
    >({
      query: ({ search, country, type, page }) => ({
        url: "/documents",
        method: "GET",
        params: { search, country, type, page },
      }),
      providesTags: ["getDocuments"],
    }),

    previewDocument: builder.mutation<
      PreviewDocumentResponse,
      PreviewDocumentRequest
    >({
      query: (body) => ({
        url: "/documents/preview",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getDocuments"],
    }),
    createDocument: builder.mutation<
      CreateDocumentResponse,
      CreateDocumentRequest
    >({
      query: (body) => ({
        url: "/documents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getDocuments"],
    }),
  }),
});

export const {
  usePreviewDocumentMutation,
  useCreateDocumentMutation,
  useGetDocumentQuery,
} = documentApi;
