"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return {
    goTo: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    back: () => router.back(),
    refresh: () => router.refresh(),
    
    updateQueryParams: (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        params.set(key, value);
      });

      router.push(`?${params.toString()}`);
    },
  };
};
