import { GetTaskResponse } from "../apiTypes";
import { apiSlice } from "./apislice";

export const workflowApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<GetTaskResponse, void>({
      query: () => ({
        url: "/documents/tasks",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTaskQuery } = workflowApis;
