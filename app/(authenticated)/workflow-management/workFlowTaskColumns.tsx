"use client";
import React from "react";
import { variantStyles } from "./workFlowStatsCard";
import TaskCard from "./taskCard";
import { FaRegPlusSquare } from "react-icons/fa";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { Task } from "@/lib/redux/apiTypes";
import TaskSkeleton from "@/components/common/skletons/taksSkeleton";

type WorkFlowTaskColumnsProps = {
  tasks: Task[];
  isLoading: boolean;
};

const WorkFlowTaskColumns: React.FC<WorkFlowTaskColumnsProps> = ({
  tasks,
  isLoading,
}) => {
  const { openDrawer } = useDrawer();
  return (
    <div>
      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div
            className={`${variantStyles["indigo"].bg} ${variantStyles["indigo"].border} border animate-fadeIn  p-4 rounded-md col-span-1`}
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
              {tasks
                ?.filter((task) => task.status === "CREATED")
                .map((assignment) => (
                  <TaskCard key={assignment.id} task={assignment} />
                ))}
            </div>
          </div>
          <div
            className={`${variantStyles["emerald"].bg} ${variantStyles["emerald"].border} animate-fadeIn  border p-4 rounded-md  col-span-1`}
          >
            <div className="flex items-center  gap-2">
              <div className="text-xl font-semibold ">To Edit</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                5
              </div>
            </div>
            {tasks
              ?.filter((task) => task.status === "UNDER_EDITING")
              .map((assignment) => (
                <TaskCard key={assignment.id} task={assignment} />
              ))}
          </div>
          <div
            className={`${variantStyles["amber"].bg} ${variantStyles["amber"].border} animate-fadeIn border p-4 rounded-md  col-span-1`}
          >
            <div className="flex items-center  gap-2">
              <div className="text-xl font-semibold ">To Review</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                5
              </div>
            </div>
            {tasks
              ?.filter((task) => task.status === "UNDER_REVIEW")
              .map((assignment) => (
                <TaskCard key={assignment.id} task={assignment} />
              ))}
          </div>
          <div
            className={`${variantStyles["sky"].bg} ${variantStyles["sky"].border} animate-fadeIn border p-4 rounded-md  col-span-1`}
          >
            <div className="flex items-center  gap-2">
              <div className="text-xl font-semibold ">To Approve</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                5
              </div>
            </div>
            {tasks
              ?.filter((task) => task.status === "UNDER_APPROVAL")
              .map((assignment) => (
                <TaskCard key={assignment.id} task={assignment} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkFlowTaskColumns;
