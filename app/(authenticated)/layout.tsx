"use client";
import "../globals.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import HomeBreadCrumbs from "@/components/common/Breadcrumb";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="m-0 p-0 w-full h-lvh flex body-bg relative no-scrollbar ">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      <div className=" flex flex-col w-full">
        {/* Header */}
        <motion.div
          className="sticky z-40"
          initial={{ marginLeft: 75 }}
          animate={{ marginLeft: open ? 255 : 75 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Header />
          <div className="mx-4 mt-2">
            <HomeBreadCrumbs />
          </div>
        </motion.div>

        {/* Scrollable Content */}
        <motion.main
          className=" overflow-y-auto px-4 py-2 relative  "
          initial={{ marginLeft: 75 }}
          animate={{ marginLeft: open ? 255 : 75 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
