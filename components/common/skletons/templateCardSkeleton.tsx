import React from "react";

const TemplateCardSkeleton: React.FC = () => {
  return (
    <div className=" flex gap-6 flex-wrap">
      <div className="flex flex-col gap-4  w-105 spcBNS rounded-[10px] skeleton h-110 "></div>
      <div className="flex flex-col gap-4  w-105 spcBNS rounded-[10px] skeleton h-110 "></div>
      <div className="flex flex-col gap-4  w-105 spcBNS rounded-[10px] skeleton h-110 "></div>
      <div className="flex flex-col gap-4  w-105 spcBNS rounded-[10px] skeleton h-110 "></div>{" "}
    </div>
  );
};

export default TemplateCardSkeleton;
