"use client";
import React, { useMemo } from "react";
import CalenderComponent from "./calenderComponent";
import { GetTaskResponse } from "@/lib/redux/apiTypes";
import { useGetTaskQuery } from "@/lib/redux/slices/workflowApis";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { TimeSheetSearchParams } from "./page";
import { formatedDate } from "@/lib/utilMethods";
import MiniChip from "@/components/common/miniChip";

type TimeSheetProps = {
  params: TimeSheetSearchParams;
};

const TimeSheet: React.FC<TimeSheetProps> = ({ params }) => {
  const query = useGetTaskQuery();
  const tasks = useQueryErrorHandler(query, "Get Tasks");
  const getUserTaskList = (tasks?: GetTaskResponse, userId?: string) => {
    if (!tasks?.data || !userId) return [];

    return tasks.data
      .filter((task) => task.assignments?.some((a) => a.user.id === userId))
      .map((task) => ({
        id: task.id,
        title: task.title,
        date: formatedDate(task.createdAt),
        task,
        status: task.status,
        taskType: task.taskType,
        description: task.description,
        assignments: task.assignments,
      }));
  };

  const userTaskList = useMemo(() => {
    return getUserTaskList(tasks, params.userId);
  }, [tasks, params.userId]);
  return (
    <CalenderComponent
      renderCell={(date) => {
        const tasks = userTaskList.filter(
          (t) => new Date(t.date).toDateString() === date.toDateString(),
        );

        return (
          <div className="flex flex-col gap-3 m-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="text-xs rounded spcBNS bg-white p-4"
              >
                <div className="text-sm text-gray-400">Product & Task Name</div>
                <div className="text-base capitalize">{task.title}</div>
                <MiniChip status={task.status} size="small" />
              </div>
            ))}
          </div>
        );
      }}
    />
  );
};

export default TimeSheet;
