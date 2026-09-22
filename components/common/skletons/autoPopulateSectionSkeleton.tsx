import React from "react";

type AutoPopulateSectionSkeletonProps = {};

const AutoPopulateSectionSkeleton: React.FC<
  AutoPopulateSectionSkeletonProps
> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 spcBNS p-4 rounded-[10px]">
        <div className="h-10 w-full skeleton"></div>
        <div className="h-36 w-full skeleton"></div>
      </div>
      <div className="flex flex-col gap-4 spcBNS p-4 rounded-[10px]">
        <div className="h-10 w-full skeleton"></div>
        <div className="h-36 w-full skeleton"></div>
      </div>
      <div className="flex flex-col gap-4 spcBNS p-4 rounded-[10px]">
        <div className="h-10 w-full skeleton"></div>
        <div className="h-36 w-full skeleton"></div>
      </div>
    </div>
  );
};

export default AutoPopulateSectionSkeleton;
