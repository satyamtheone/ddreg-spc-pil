"use client";
import React from "react";

type TemplateDrawerSkeletonProps = {};

const TemplateDrawerSkeleton: React.FC<TemplateDrawerSkeletonProps> = (
  props,
) => {
  return (
    <div className="w-full h-full flex flex-col gap-4  justify-between">
      <div className="flex flex-col gap-4  ">
        <div className="grid grid-cols-2  gap-4">
          <div className="skeleton h-22 spcBNS "></div>
          <div className="skeleton h-22  spcBNS"></div>
        </div>
        <div className="grid grid-cols-3  gap-4">
          <div className="skeleton h-22 spcBNS"></div>
          <div className="skeleton h-22 spcBNS"></div>
          <div className="skeleton h-22 spcBNS "></div>
        </div>
      </div>
      <div className="spcBNS skeleton p-4 h-8/12 overflow-auto rounded-[10px] mb-15"></div>
    </div>
  );
};

export default TemplateDrawerSkeleton;
