"use client";
import React, { useMemo } from "react";
import { variantStyles } from "./workFlowStatsCard";
import TaskCard from "./taskCard";
import { FaRegPlusSquare } from "react-icons/fa";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { Task } from "@/lib/redux/apiTypes";
import TaskSkeleton from "@/components/common/skletons/taksSkeleton";
import CreateTaskDrawer from "./tasks/createTaskDrawer";
import { useAuth } from "@/lib/AuthProvider";

type WorkFlowTaskColumnsProps = {
  tasks: Task[];
  isLoading: boolean;
};

const columns = [
  {
    title: "To Do",
    status: "CREATED",
    variant: "sky",
    showAdd: true,
  },
  {
    title: "In Edit",
    status: "UNDER_EDITING",
    variant: "indigo",
  },
  {
    title: "In Review",
    status: "UNDER_REVIEW",
    variant: "amber",
  },
  {
    title: "In Approve",
    status: "UNDER_APPROVAL",
    variant: "sky",
  },
  {
    title: "Completed Tasks",
    status: "APPROVED",
    variant: "emerald",
  },
];

const WorkFlowTaskColumns: React.FC<WorkFlowTaskColumnsProps> = ({
  tasks,
  isLoading,
}) => {
  const { isUser } = useAuth();
  const { openDrawer } = useDrawer();
  const groupedTasks = useMemo(() => {
    return tasks?.reduce(
      (acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
      },
      {} as Record<string, Task[]>,
    );
  }, [tasks]);

  if (isLoading) return <TaskSkeleton />;

  return (
    <div className="w-full h-full carousel space-x-4">
      {columns.map((col) => {
        const list = groupedTasks?.[col.status] || [];

        return (
          <div
            key={col.status}
            className={`${variantStyles[col.variant as keyof typeof variantStyles].bg} ${variantStyles[col.variant as keyof typeof variantStyles].border} border py-4 rounded-xl min-w-100 carousel-item scroll-smooth flex flex-col`}
          >
            <div className="flex items-center justify-between mb-3 px-3">
              <div className="flex items-center gap-2">
                <div className="text-xl font-semibold">{col.title}</div>
                <div
                  className={`border ${variantStyles[col.variant as keyof typeof variantStyles].bg} ${variantStyles[col.variant as keyof typeof variantStyles].border} text-sm flex items-center justify-center rounded-full h-7 w-7`}
                >
                  {list.length}
                </div>
              </div>

              {!isUser && col.showAdd && (
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
              )}
            </div>

            <div className="flex flex-col gap-4 overflow-auto px-3 pb-6">
              {list.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkFlowTaskColumns;
