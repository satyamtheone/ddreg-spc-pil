import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  CreateRoleResponse,
  CreateTaskRequest,
  GetTaskResponse,
  UpdateRoleRequest,
  UpdateTasActionRequest,
} from "../apiTypes";
import { apiSlice } from "./apislice";

export const workflowApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<GetTaskResponse, void>({
      query: () => ({
        url: "/documents/tasks",
        method: "GET",
      }),
      providesTags: ["getTasks"],
    }),
    createTask: builder.mutation<
      CreateDocumentResponse,
      { versionId: string; body: CreateTaskRequest }
    >({
      query: ({ versionId, body }) => ({
        url: `/documents/versions/${versionId}/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["getTasks", "getDocuments", "getSingleDocumentVersion"],
    }),
    updateTaskAction: builder.mutation<
      CreateDocumentResponse,
      UpdateTasActionRequest
    >({
      query: ({ id, body }) => ({
        url: `/documents/tasks/${id}/transition`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["getTasks"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskActionMutation,
} = workflowApis;
