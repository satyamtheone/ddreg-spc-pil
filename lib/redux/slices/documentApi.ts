import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  GetDocumentResponse,
  GetDocumentVersionsResponse,
  GetSingleDocumentVersionResponse,
  PreviewDocumentRequest,
  PreviewDocumentResponse,
  SaveDocxToS3Request,
  SaveDocxToS3Response,
} from "../apiTypes";
import { apiSlice } from "./apislice";

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocument: builder.query<
      GetDocumentResponse,
      {
        search?: string;
        country?: string;
        type?: string;
        page?: number;
        pageSize?: number;
      }
    >({
      query: ({ search, country, type, page, pageSize }) => ({
        url: "/documents",
        method: "GET",
        params: { search, country, type, page, pageSize },
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

    getDocumentVersions: builder.query<
      GetDocumentVersionsResponse,
      { docId: string; page?: number; pageSize?: number }
    >({
      query: ({ docId, page, pageSize = 10 }) => ({
        url: `/documents/${docId}/versions?page=${page}&pageSize=${pageSize}`,
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: ["getSingleDocumentVersion"],
    }),

    getSingleDocumentVersions: builder.query<
      GetSingleDocumentVersionResponse,
      { docId: string }
    >({
      query: ({ docId }) => ({
        url: `/documents/${docId}/version`,
        method: "GET",
      }),
    }),

    getDocumentBuffer: builder.mutation<
      {
        success: boolean;
        url: string;
      },
      { document_url: string; response_type: "url" }
    >({
      query: (body) => ({
        url: "/convert/pdf2docx",
        method: "POST",
        body,
      }),
    }),

    saveDocxToS3: builder.mutation<
      SaveDocxToS3Response,
      { versionId: string; body: SaveDocxToS3Request }
    >({
      query: ({ versionId, body }) => ({
        url: `/documents/versions/${versionId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["getTasks"],
    }),
  }),
});

export const {
  usePreviewDocumentMutation,
  useCreateDocumentMutation,
  useGetDocumentQuery,
  useGetDocumentVersionsQuery,
  useGetSingleDocumentVersionsQuery,
  useGetDocumentBufferMutation,
  useSaveDocxToS3Mutation,
} = documentApi;
