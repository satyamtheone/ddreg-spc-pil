"use client";
import React, { useEffect, useMemo } from "react";
import { SearchDocument } from "@/components/common/webSearch/SearchDocument";
import {
  useGetDashboardDocumentGenerationByCountryQuery,
  useGetDashboardDocumentGenerationOver6MonthsQuery,
  useGetDashboardReferenceQuery,
  useGetDashboardTaskApprovalStatusQuery,
} from "@/lib/redux/slices/dashboardApi";
import DashboardCharts from "./components/dashboardCharts";
import toast from "react-hot-toast";

export const DashboardPage: React.FC = () => {
  const dashboardReferenceQuery = useGetDashboardReferenceQuery();

  const dashboardPastSixMonthQuery =
    useGetDashboardDocumentGenerationOver6MonthsQuery();

  const dashboardTaskStatusQuery = useGetDashboardTaskApprovalStatusQuery();

  const dashboardCountriesQuery =
    useGetDashboardDocumentGenerationByCountryQuery();

  const {
    data: dashboardReference,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    error: dashboardError,
  } = dashboardReferenceQuery;

  const {
    data: pastSixMonth,
    isLoading: isPastSixMonthLoading,
    isError: isPastSixMonthError,
    error: pastSixMonthError,
  } = dashboardPastSixMonthQuery;

  const {
    data: taskStatus,
    isLoading: isTaskStatusLoading,
    isError: isTaskStatusError,
    error: taskStatusError,
  } = dashboardTaskStatusQuery;

  const {
    data: countries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    error: countriesError,
  } = dashboardCountriesQuery;

  const taskStatusData = useMemo(
    () => ({
      week: taskStatus?.data?.map((item) => String(item.week)) ?? [],
      pending: taskStatus?.data?.map((item) => item.pending) ?? [],
      approved: taskStatus?.data?.map((item) => item.approved) ?? [],
    }),
    [taskStatus],
  );

  const countryData = useMemo(
    () =>
      countries?.data?.map((item) => ({
        label: item.country,
        value: item.count,
        spc: 0,
        pil: 0,
      })) ?? [],
    [countries],
  );

  const pastSixMonthData = useMemo(
    () => ({
      month: pastSixMonth?.data?.map((item) => String(item.month)) ?? [],
      count: pastSixMonth?.data?.map((item) => item.count) ?? [],
    }),
    [pastSixMonth],
  );

  useEffect(() => {
    const error =
      dashboardError || pastSixMonthError || taskStatusError || countriesError;

    if (error) {
      toast.error(
        "data" in (error as any)
          ? (error as any)?.data?.message || "Something went wrong"
          : "Something went wrong",
      );
    }
  }, [dashboardError, pastSixMonthError, taskStatusError, countriesError]);

  return (
    <div className="space-y-2.5">
      <SearchDocument />
      <DashboardCharts
        isDashboardLoading={isDashboardLoading}
        isPastSixMonthLoading={isPastSixMonthLoading}
        isTaskStatusLoading={isTaskStatusLoading}
        isCountriesLoading={isCountriesLoading}
        countryData={countryData}
        dashboardReference={dashboardReference}
        pastSixMonthData={pastSixMonthData}
        taskStatusData={taskStatusData}
      />
    </div>
  );
};
