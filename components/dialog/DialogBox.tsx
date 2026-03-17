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
          ? "h-[calc(100vh-80px)] sm:w-[calc(100vw-40px)] w-screen md:p-4 p-2 "
          : `max-h-[calc(100vh-40px)] p-4 ${
              size ? size : "max-w-xl min-h-1/2 min-w-2/3"
            }`
      } bg-white overflow-auto rounded-xl relative text-left gap-10 animate-fadeIn ${className}`}
    >
      <div className="-ml-4 flex justify-between items-center static font-semibold border-l-4 border-cyan-500 bg-cultured-100 top-0 mb-8">
        <div className="md:text-2xl text-xl">
          <span className="pl-3 capitalize">{title}</span>
        </div>

        {!hideCloseIcon && <DialogCloseIcon />}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default DialogBox;