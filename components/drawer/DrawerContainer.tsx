"use client";

import React, { ReactNode } from "react";
import DrawerCloseButton from "./DrawerCloseButton";

type DrawerPosition = "left" | "right";

interface DrawerContainerProps {
  open: boolean;
  position?: DrawerPosition;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
}

const DrawerContainer = ({
  open,
  position = "right",
  onClose,
  children,
  title,
  width,
}: DrawerContainerProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 z-50 h-full ${
          width ? width : "min-w-1/2"
        } bg-white 
          ${position === "left" ? "left-0" : "right-0"}
          ${
            open
              ? "translate-x-0 animate-dialog-slide-in"
              : position === "left"
                ? "-translate-x-full animate-dialog-slide-down"
                : "translate-x-full animate-dialog-slide-down"
          }
        `}
      >
        <div className="border-b py-4 bg-gradient text-white pr-2 border-b-gray-200 flex justify-between items-center static font-semibold top-0">
          <div className="text-2xl border-l-4 py-2 border-white">
            <span className="pl-3 ">{title}</span>
          </div>

          <DrawerCloseButton />
        </div>

        <div className="h-[90%] w-full overflow-auto p-4 pt-0">{children}</div>
      </div>
    </>
  );
};

export default DrawerContainer;