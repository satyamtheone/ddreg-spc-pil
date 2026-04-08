"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { NavData, NavLinkItem } from "@/lib/utils";

const HomeBreadCrumbs = () => {
  const pathname = usePathname();
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idFromQuery = params.get("productId");

      if (idFromQuery) {
        setProductId(idFromQuery);
        return;
      }

      const match = pathname.match(/referenceId\/([^/]+)/);
      if (match) {
        setProductId(match[1]);
      }
    }
  }, [pathname]);

  const buildLink = (link: string) => {
    if (link.includes("generateDocument") && productId) {
      return `${link}?referenceId=${productId}`;
    }
    return link;
  };
  const isDashboard = pathname === "/dashboard";

  const breadcrumbTrail = useMemo(() => {
    const links: NavLinkItem[] = NavData;

    const findBreadcrumbs = (
      items: NavLinkItem[],
      trail: NavLinkItem[] = [],
    ): NavLinkItem[] => {
      for (const item of items) {
        const itemPath = item.link?.split("?")[0];
        const newTrail = [...trail, item];

        // exact match
        if (itemPath === pathname) {
          return newTrail;
        }

        // search children
        if (item.children?.length) {
          const childTrail = findBreadcrumbs(item.children, newTrail);
          if (childTrail.length) return childTrail;
        }
      }

      return [];
    };
    return findBreadcrumbs(links);
  }, [pathname, productId]);

  return (
    <div className="bg-white mb-2 pl-6 spcBNS rounded-lg">
      <div className="breadcrumbs text-xs">
        <ul>
          {!isDashboard && (
            <li className="text-gray-500">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}

          {breadcrumbTrail.map((item, index) => (
            <li key={`${item.link}-${index}`}>
              <Link
                href={buildLink(item.link)}
                className="flex items-center gap-1"
              >
                {item.icon && <item.icon />}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeBreadCrumbs;
