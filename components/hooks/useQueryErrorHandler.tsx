"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

// Generic type for data
type QueryType<T> = {
  data?: T;
  isError: boolean;
  error?: any;
  isLoading: boolean;
  isFetching: boolean;
};

export function useQueryErrorHandler<T>(
  query: QueryType<T>,
  apiName: string = "API"
): T | undefined {
  const { data, isError, error, isLoading, isFetching } = query;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isError && error && !isLoading && !isFetching) {
      timeoutRef.current = setTimeout(() => {
        const message =
          error?.data?.message ||
          error?.data?.error ||
          error?.error ||
          "Something went wrong";

        toast.error(
          <div className="flex flex-col gap-2 text-xs">
            <strong>{apiName}</strong>
            <div>{message}</div>
          </div>
        );
      }, 700);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isError, error, isLoading, isFetching, apiName]);

  return data;
}