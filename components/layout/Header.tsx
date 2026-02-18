"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavData } from "@/lib/NavData";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function Header() {
  const pathname = usePathname();

  const { title, icon, className, iconFolder } = useMemo(() => {
    const matched = NavData.find((item) => {
      const escaped = item.link.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`^${escaped}(/|$)`).test(pathname);
    });

    if (matched) {
      return {
        title: matched.title,
        icon: matched.icon,
        className: matched.className,
        iconFolder: matched.iconFolder ?? "black",
      };
    }

    const firstSegment = pathname.split("/").find((p) => p.length > 0);
    return {
      title: firstSegment
        ? firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)
        : "Dashboard",
      icon: "Icon-01.svg",
      className: "bg-white",
      iconFolder: "black",
    };
  }, [pathname]);

  return (
    <header className={`mx-4 mt-4 border shadow-xs rounded-lg ${className}`}>
      <div className="px-2 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Page Icon */}
            <Image
              src={`/sidebar/${iconFolder}/${icon}`}
              alt="Page Icon"
              width={20}
              height={20}
              className="object-contain"
            />

            {/* Page Title */}
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 rounded-lg border ${iconFolder === "white" ? "border-white text-white focus:ring-0! focus:border-white! placeholder:text-white" : "text-black"} transition-colors w-full`}
            />
            <Image
              src={`/header/${iconFolder}/Icon-01.svg`}
              alt="Search Icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 object-contain"
            />
          </div>

          {/* Search and Icon Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`p-2 border rounded-lg transition-colors cursor-pointer ${iconFolder === "white" ? "text-white hover:bg-white/10 border-white" : "text-black hover:bg-gray-100"}`}
            >
              <Image
                src={`/header/${iconFolder}/Icon-02.svg`}
                alt="Icon 02"
                width={24}
                height={24}
                className="object-contain"
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`p-2 border rounded-lg transition-colors cursor-pointer ${iconFolder === "white" ? "text-white hover:bg-white/10 border-white" : "text-black hover:bg-gray-100"}`}
            >
              <Image
                src={`/header/${iconFolder}/Icon-03.svg`}
                alt="Icon 03"
                width={24}
                height={24}
                className="object-contain"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
