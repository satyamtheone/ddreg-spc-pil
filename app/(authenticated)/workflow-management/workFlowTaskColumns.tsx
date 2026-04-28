"use client";
import React from "react";
import { variantStyles } from "./workFlowStatsCard";
import TaskCard from "./taskCard";
import { FaRegPlusSquare } from "react-icons/fa";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { Task } from "@/lib/redux/apiTypes";
import TaskSkeleton from "@/components/common/skletons/taksSkeleton";
import CreateTaskDrawer from "./tasks/createTaskDrawer";

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
    <div className="w-full h-full">
      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <div className=" w-full h-full carousel space-x-4 ">
          <div
            className={`${variantStyles["indigo"].bg} ${variantStyles["indigo"].border} border animate-fadeIn   p-4 rounded-md min-w-100 overflow-auto carousel-item  flex flex-col  carousel-item  flex flex-col`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center  gap-2">
                <div className="text-xl font-semibold ">To Do</div>
                <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                  {tasks?.filter((task) => task.status === "CREATED").length}
                </div>
              </div>

              <span
                onClick={() =>
                  openDrawer({
                    title: "Create Task",
                    width: "w-2/3",
                    children: <CreateTaskDrawer />,
                  })
                }
                className="cursor-pointer custom-button-hover-classes"
              >
                <FaRegPlusSquare size={20} />
              </span>
            </div>
            <div className="flex flex-col gap-4 min-h-150">
              {tasks
                ?.filter((task) => task.status === "CREATED")
                .map((assignment) => (
                  <TaskCard key={assignment.id} task={assignment} />
                ))}
            </div>
          </div>

          <div
            className={`${variantStyles["emerald"].bg} ${variantStyles["emerald"].border} animate-fadeIn  border p-4 rounded-md  min-w-100 overflow-auto carousel-item  flex flex-col`}
          >
            <div className="flex items-center  gap-2 mb-3">
              <div className="text-xl font-semibold ">To Edit</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                {
                  tasks?.filter((task) => task.status === "UNDER_EDITING")
                    .length
                }
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {tasks
                ?.filter((task) => task.status === "UNDER_EDITING")
                .map((assignment) => (
                  <TaskCard key={assignment.id} task={assignment} />
                ))}
            </div>
          </div>
          <div
            className={`${variantStyles["amber"].bg} ${variantStyles["amber"].border} animate-fadeIn border p-4 rounded-md  min-w-100 overflow-auto carousel-item  flex flex-col `}
          >
            <div className="flex items-center  gap-2 mb-3">
              <div className="text-xl font-semibold ">To Review</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                {tasks?.filter((task) => task.status === "UNDER_REVIEW").length}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {tasks
                ?.filter((task) => task.status === "UNDER_REVIEW")
                .map((assignment) => (
                  <TaskCard key={assignment.id} task={assignment} />
                ))}
            </div>
          </div>
          <div
            className={`${variantStyles["sky"].bg} ${variantStyles["sky"].border} animate-fadeIn border p-4 rounded-md  min-w-100 overflow-auto carousel-item  flex flex-col `}
          >
            <div className="flex items-center  gap-2 mb-3">
              <div className="text-xl font-semibold ">To Approve</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                {
                  tasks?.filter((task) => task.status === "UNDER_APPROVAL")
                    .length
                }
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {tasks
                ?.filter((task) => task.status === "UNDER_APPROVAL")
                .map((assignment) => (
                  <TaskCard key={assignment.id} task={assignment} />
                ))}
            </div>
          </div>
          <div
            className={`${variantStyles["sky"].bg} ${variantStyles["sky"].border} animate-fadeIn border p-4 rounded-md  min-w-100 overflow-auto carousel-item  flex flex-col `}
          >
            <div className="flex items-center  gap-2 mb-3">
              <div className="text-xl font-semibold ">Completed Tasks</div>
              <div className="border border-blue-500 bg-blue-500/15 text-sm flex items-center justify-center rounded-full h-7 w-7">
                {tasks?.filter((task) => task.status === "APPROVED").length}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {tasks
                ?.filter((task) => task.status === "APPROVED")
                .map((assignment) => (
                  <TaskCard key={assignment.id} task={assignment} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkFlowTaskColumns;
