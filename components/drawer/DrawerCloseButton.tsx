"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { useDrawer } from "../hooks/DrawerProvider";

const DrawerCloseButton: React.FC = () => {
  const { closeDrawer } = useDrawer();

  return (
    <div
      onClick={closeDrawer}
      className="border shadow-md border-gray-200 rounded-lg h-12.5 w-12.5 flex justify-center items-center cursor-pointer hover:text-white hover:bg-red-400"
    >
      <HiXMark className="h-8 w-8" />
    </div>
  );
};

export default DrawerCloseButton;