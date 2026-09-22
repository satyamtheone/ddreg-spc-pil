"use client";
import React, { ReactNode } from "react";
import DialogCloseIcon from "./DialogCloseIcon";

interface DialogBoxProps {
  children: ReactNode;
  className?: string;
  hideCloseIcon?: boolean;
  fullWidth?: boolean;
  size?: string;
  title?: string;
}

const DialogBox = ({
  children,
  className = "",
  hideCloseIcon = false,
  fullWidth = false,
  size,
  title,
}: DialogBoxProps) => {
  return (
    <div
      className={`${
        fullWidth
          ? "h-[calc(100vh-80px)] sm:w-[calc(100vw-40px)] w-screen  "
          : `max-h-[calc(100vh-40px)]  ${
              size ? size : "max-w-xl min-h-1/2 min-w-2/3"
            }`
      } bg-white overflow-auto rounded-xl relative text-left gap-10 animate-fadeIn ${className}`}
    >
      <div className="-ml-4 p-4  bg-gradient flex justify-between items-center static font-semibold  bg-cultured-100 top-0 mb-8">
        <div className="md:text-2xl text-xl">
          <span className="pl-3 border-l-4 border-white capitalize">
            {title}
          </span>
        </div>
        {!hideCloseIcon && <DialogCloseIcon />}
      </div>

      <div className="p-4">{children}</div>
    </div>
  );
};

export default DialogBox;