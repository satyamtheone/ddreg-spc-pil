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
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

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
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            image: parsedUser.image || undefined,
          });
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }
  }, []);

  const getAvatarInitials = (name: string) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
        <div className="p-2.5 border-t h-44.5">
          <div
            className={`flex flex-col items-center justify-center bg-[#E3F3FE] rounded-md space-y-3.5 ${open ? "p-2.5" : "p-0.5"}`}
          >
            <Link
              href={"/account"}
              className={`border border-sky-400 rounded-md w-full flex items-center justify-between gap-2 overflow-hidden ${open ? " py-1 px-2" : "p-0.5"}`}
            >
              <div className="flex gap-2.5">
                {userData?.image ? (
                  <Image
                    src={userData.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`${open ? "w-8 h-8" : "w-7 h-7"} bg-white flex items-center justify-center text-sm font-medium text-sky-400 rounded-full`}
                  >
                    {getAvatarInitials(userData?.name || "")}
                  </div>
                )}
                <div>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, visibility: "hidden" }}
                      animate={{ opacity: 1, visibility: "visible" }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-xs font-medium"
                    >
                      {userData?.name || "User"}
                    </motion.p>
                  )}
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, visibility: "hidden" }}
                      animate={{ opacity: 1, visibility: "visible" }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="text-xs text-gray-500"
                    >
                      {userData?.email || "user@example.com"}
                    </motion.p>
                  )}
                </div>
              </div>
              <div>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Image
                      src="/sidebar/footer/Icon-01.svg"
                      alt="Logout Icon"
                      width={12}
                      height={12}
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
