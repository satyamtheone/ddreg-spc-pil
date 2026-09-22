"use client";
import React from "react";

type TaskSkeletonProps = {};

const TaskSkeleton: React.FC<TaskSkeletonProps> = (props) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className=" skeleton h-120 spcBNS"></div>
      <div className=" skeleton h-120 spcBNS"></div>
      <div className=" skeleton h-120 spcBNS"></div>
      <div className=" skeleton h-120 spcBNS"></div>
    </div>
  );
};

export default TaskSkeleton;
