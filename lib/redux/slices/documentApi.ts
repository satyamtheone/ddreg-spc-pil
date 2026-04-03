import { PreviewDocumentRequest, PreviewDocumentResponse } from "../apiTypes";
import { apiSlice } from "./apislice";

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    previewDocument: builder.mutation<
      PreviewDocumentResponse,
      PreviewDocumentRequest
    >({
      query: (body) => ({
        url: "/documents/preview",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getTemplates"],
    }),
  }),
});

export const { usePreviewDocumentMutation } = documentApi;
