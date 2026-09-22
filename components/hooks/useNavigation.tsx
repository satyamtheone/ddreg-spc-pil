"use client";

import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  return {
    goTo: (path: string) => router.push(path),

    replace: (path: string) => router.replace(path),

    back: () => router.back(),

    refresh: () => router.refresh(),

    updateQueryParams: (paramsToUpdate: Record<string, string>) => {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);

      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

      window.history.pushState({}, "", url.toString());
    },
  };
};
