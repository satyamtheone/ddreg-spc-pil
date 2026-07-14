"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavData } from "@/lib/NavData";
import Image from "next/image";
import ModalProvider from "../dialog/Dialog";
import LogoutDialog from "@/features/auth/logoutDialog";
import { useDialog } from "../hooks/DialogProvider";
import DynamicButton from "../common/DynamicButton";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiRefresh } from "react-icons/bi";

export default function Header() {
  const pathname = usePathname();
  const { openDialog } = useDialog();

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
    <header className={`mx-4 mt-4 border  shadow-xs rounded-lg ${className}`}>
      <div className="px-2 py-2.5">
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex items-center  gap-2">
            {/* Page Icon */}
            <Image
              src={`/sidebar/${iconFolder}/${icon}`}
              alt="Page Icon"
              width={25}
              height={25}
              className="object-contain"
            />
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <DynamicButton
              icon={<BiRefresh size={20} />}
              size="slim"
              variant="outline"
              className="px-2 "
              onClick={() => window.location.reload()}
            />

            <div className="flex items-center gap-3">
              <DynamicButton
                icon={<RiLogoutCircleRLine size={20} />}
                size="slim"
                variant="danger"
                className="px-2 "
                onClick={() => {
                  openDialog({
                    children: (
                      <ModalProvider
                        size="md:w-200 w-11/12 "
                        title={`Logout`}
                        children={<LogoutDialog />}
                      />
                    ),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
