"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TitleUpdater: React.FC = () => {
  const pathname: string = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const segments: string[] = pathname.split("/").filter(Boolean);
    const last: string | undefined = segments[segments.length - 1];

    const formatted: string | undefined = last
      ?.replace(/-/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    document.title = formatted || "Vitalic Lc";
  }, [pathname]);

  return null;
};

export default TitleUpdater;
