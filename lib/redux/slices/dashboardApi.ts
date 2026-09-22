import {
  GetDashboardDocumentGenerationByCountryResponse,
  GetDashboardReferenceResponseType,
  GetDashboardTaskStatusResponseType,
  GetdocumentGenerationOverSixMonthsResponse,
} from "../apiTypes";
import { apiSlice } from "./apislice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardReference: builder.query<
      GetDashboardReferenceResponseType,
      void
    >({
      query: (body) => ({
        url: "/dashboard/referenceCreations",
        method: "GET",
        body,
      }),
    }),
    getDashboardDocumentGenerationOver6Months: builder.query<
      GetdocumentGenerationOverSixMonthsResponse,
      void
    >({
      query: (body) => ({
        url: "/dashboard/documentGenerationOverSixMonths",
        method: "GET",
        body,
      }),
    }),
    getDashboardTaskApprovalStatus: builder.query<
      GetDashboardTaskStatusResponseType,
      void
    >({
      query: (body) => ({
        url: "/dashboard/taskApprovalStatus",
        method: "GET",
        body,
      }),
    }),
    getDashboardDocumentGenerationByCountry: builder.query<
      GetDashboardDocumentGenerationByCountryResponse,
      void
    >({
      query: (body) => ({
        url: "/dashboard/documentGenerationByCountry",
        method: "GET",
        body,
      }),
    }),
  }),
});

export const {
  useGetDashboardReferenceQuery,
  useGetDashboardDocumentGenerationOver6MonthsQuery,
  useGetDashboardTaskApprovalStatusQuery,
  useGetDashboardDocumentGenerationByCountryQuery,
} = dashboardApi;
