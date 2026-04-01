"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavData } from "@/lib/NavData";
import { useState } from "react";
import UserAvatar from "@/app/(authenticated)/account/userAvatar";
import { useGetMeQuery } from "@/lib/redux/slices/userApi";
import { useQueryErrorHandler } from "../hooks/useQueryErrorHandler";
import { useAuth } from "@/lib/AuthProvider";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

interface UserData {
  name: string;
  email: string;
  image?: string;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const { user, imageUrl } = useAuth();
  const pathname = usePathname();
  const isActive = (link: string) => {
    const linkPattern = new RegExp(`^${link}(/|$)`);
    return linkPattern.test(pathname);
  };

  return (
    <TooltipProvider>
      <motion.aside
        className="m-4 fixed border z-50 h-[calc(100vh-1.9rem)] bg-white dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-xl flex flex-col"
        initial={{ width: 60 }}
        animate={{ width: open ? 240 : 60 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Sidebar Header */}
        <div className="relative h-17.5 border-b flex w-full items-center justify-center">
          <Image
            src={
              open
                ? "/sidebar/header/Icon-01.svg"
                : "/sidebar/header/Icon-03.svg"
            }
            alt="SPC-PIL Logo"
            fill
            className="mx-auto object-contain p-2.5"
          />

          {/* Toggle Button - Floating above sidebar */}
          <Image
            src="/sidebar/header/Icon-02.svg"
            alt="Menu Toggle"
            width={20}
            height={20}
            className={`absolute -right-2.5 bg-white border  dark:border-slate-700 rounded-lg cursor-pointer transition-transform duration-300 p-1 ${open ? "rotate-180" : ""}`}
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-2 no-scrollbar">
          <ul className="space-y-0.5 px-2">
            {NavData.filter((item) => !item.hidden).map((item, index) => {
              const active = isActive(item.link);

              return (
                <li key={index}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.link}
                        className={`flex items-center gap-3 p-2.5 rounded-lg ${
                          active
                            ? "bg-gradient text-white"
                            : "text-theme-secondary dark:text-gray-300 hover:bg-[#E3F3FE] dark:hover:bg-[#1E2A38]"
                        }`}
                      >
                        <div>
                          <Image
                            src={`/sidebar/${active ? "white" : "black"}/${item.icon}`}
                            alt={item.title}
                            width={20}
                            height={20}
                            className="shrink-0 flex-1 w-5 h-5"
                          />
                        </div>
                        {open && (
                          <motion.span
                            initial={{ opacity: 0, visibility: "hidden" }}
                            animate={{ opacity: 1, visibility: "visible" }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="text-sm font-medium truncate"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {!open && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2.5 border-t">
          <div className={`flex  rounded-md`}>
            <Link
              href={"/account"}
              className={`spcBNS rounded-md w-full flex items-center justify-between gap-2 overflow-hidden `}
            >
              <div className="flex ">
                <div
                  className={`bg-white h-9 w-9 flex items-center justify-center text-sm font-medium text-sky-400 `}
                >
                  <img
                    src={imageUrl}
                    alt="Logout Icon"
                    className="object-contain rounded-md"
                  />
                </div>

                <div className="pl-2 py-0.5">
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, visibility: "hidden" }}
                      animate={{ opacity: 1, visibility: "visible" }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-xs font-medium"
                    >
                      {user?.fName || "User"}
                    </motion.p>
                  )}
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, visibility: "hidden" }}
                      animate={{ opacity: 1, visibility: "visible" }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="text-xs text-gray-500"
                    >
                      {user?.email || "user@example.com"}
                    </motion.p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
