"use client";
import React from "react";
import InputSkeleton from "./inputSkeleton";

type TaskFormSkeletonProps = {};

const TaskFormSkeleton: React.FC<TaskFormSkeletonProps> = (props) => {
  return (
    <div className="my-4 flex flex-col gap-16">
      <div className=" flex flex-col gap-16">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="flex gap-4">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="flex gap-4">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="flex gap-4">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </div>
    </div>
  );
};

export default TaskFormSkeleton;
