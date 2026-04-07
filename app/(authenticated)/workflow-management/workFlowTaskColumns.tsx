"use client";
import React from "react";
import { variantStyles } from "./workFlowStatsCard";
import TaskCard from "./taskCard";
import { FaRegPlusSquare } from "react-icons/fa";
import { useDrawer } from "@/components/hooks/DrawerProvider";

type WorkFlowTaskColumnsProps = {};

const WorkFlowTaskColumns: React.FC<WorkFlowTaskColumnsProps> = (props) => {
  const { openDrawer } = useDrawer();
  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      <div
        className={`${variantStyles["indigo"].bg} ${variantStyles["indigo"].border} border  p-4 rounded-md col-span-1`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center  gap-2">
            <div className="text-xl font-semibold ">To Do</div>
            <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
              5
            </div>
          </div>

          <span
            onClick={() =>
              openDrawer({
                title: "Add Task",
                children: "add Task",
              })
            }
            className="cursor-pointer"
          >
            <FaRegPlusSquare size={20} />
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </div>
      <div
        className={`${variantStyles["emerald"].bg} ${variantStyles["emerald"].border} border p-4 rounded-md  col-span-1`}
      >
        <TaskCard />
      </div>
      <div
        className={`${variantStyles["amber"].bg} ${variantStyles["amber"].border} border p-4 rounded-md  col-span-1`}
      >
        <TaskCard />
      </div>
      <div
        className={`${variantStyles["sky"].bg} ${variantStyles["sky"].border} border p-4 rounded-md  col-span-1`}
      >
        <TaskCard />
      </div>
    </div>
  );
};

export default WorkFlowTaskColumns;
