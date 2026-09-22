import React from "react";

type WorkflowStatsSkeletonProps = {};

const WorkflowStatsSkeleton: React.FC<WorkflowStatsSkeletonProps> = (props) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="h-20 w-full skeleton spcBNS  rounded-[7px]"></div>
        <div className="h-20 w-full skeleton spcBNS rounded-[7px]"></div>
        <div className="h-20 w-full skeleton spcBNS rounded-[7px]"></div>
        <div className="h-20 w-full skeleton spcBNS rounded-[7px]"></div>
      </div>
      <div className="h-20 w-full skeleton spcBNS"></div>
    </div>
  );
};

export default WorkflowStatsSkeleton;
