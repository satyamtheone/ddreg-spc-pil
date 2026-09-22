"use client";
import React from "react";
import InputSkeleton from "./inputSkeleton";

const GeneralSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
    </div>
  );
};

export default GeneralSkeleton;
