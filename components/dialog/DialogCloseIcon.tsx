"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { useDialog } from "../hooks/DialogProvider";

const DialogCloseIcon: React.FC = () => {
  const { closeDialog } = useDialog();

  return (
    <div
      onClick={closeDialog}
      className="border shadow-md border-gray-200 rounded-lg md:h-12.5 h-8 w-8 md:w-12.5 flex justify-center items-center cursor-pointer hover:text-white hover:bg-red-400"
    >
      <HiXMark className="h-8 w-8" />
    </div>
  );
};

export default DialogCloseIcon;