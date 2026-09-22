import React from "react";

type ReferenceFormSkeletonProps = {};

const ReferenceFormSkeleton: React.FC<ReferenceFormSkeletonProps> = (props) => {
  return (
    <>
      <div className="col-span-4  h-full overflow-auto ">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          <div className="h-20 w-full skeleton"></div>
          <div className="h-20 w-full skeleton "></div>
          <div className="h-20 w-full skeleton"></div>
          <div className="h-20 w-full skeleton"></div>
        </div>
      </div>
      <div className="col-span-8 border-slate-300 border p-4 bg-purple-50 rounded-[10px] skeleton  h-full "></div>
    </>
  );
};

export default ReferenceFormSkeleton;
