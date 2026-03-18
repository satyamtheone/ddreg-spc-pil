"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { useDialog } from "../hooks/DialogProvider";

const DialogCloseIcon: React.FC = () => {
  const { closeDialog } = useDialog();

  return (
    <div
      onClick={closeDialog}
      className="border group shadow-md border-gray-200 bg-white rounded-lg md:h-12.5 h-8 w-8 md:w-12.5 flex justify-center items-center cursor-pointer hover:text-white hover:bg-red-400"
    >
      <HiXMark className="h-6 w-6 text-black group-hover:text-white" />
    </div>
  );
};

export default DialogCloseIcon;