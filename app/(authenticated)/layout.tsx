"use client";

import "../globals.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="m-0 p-0 w-full h-lvh flex body-bg relative">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          className="sticky z-40"
          initial={{ marginLeft: 75 }}
          animate={{ marginLeft: open ? 255 : 75 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Header />
        </motion.div>

        {/* Scrollable Content */}
        <motion.main
          className="flex-1 overflow-y-auto px-4 py-2 relative no-scrollbar"
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
