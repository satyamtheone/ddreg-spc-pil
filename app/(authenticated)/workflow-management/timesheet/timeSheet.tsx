"use client";
import React, { useMemo } from "react";
import CalenderComponent from "./calenderComponent";
import { GetTaskResponse } from "@/lib/redux/apiTypes";
import { useGetTaskQuery } from "@/lib/redux/slices/workflowApis";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { TimeSheetSearchParams } from "./page";
import { formatedDate } from "@/lib/utilMethods";
import MiniChip from "@/components/common/miniChip";
import {
  useGetUserByIdQuery,
  useGetUsersQuery,
} from "@/lib/redux/slices/userApi";

type TimeSheetProps = {
  params: TimeSheetSearchParams;
};

const TimeSheet: React.FC<TimeSheetProps> = ({ params }) => {
  const usersQuery = useGetUsersQuery();
  const users = useQueryErrorHandler(usersQuery, "Get All Users");
  const query = useGetTaskQuery();
  const tasks = useQueryErrorHandler(query, "Get Tasks");
  const user = users?.data.find((f) => f.id === params.userId);

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

  const Todaytasks = userTaskList.filter(
    (t) => new Date(t.date).toDateString() === new Date().toDateString(),
  );
  return (
    <div>
      {usersQuery.isLoading ? (
        <div className="skeleton w-full h-20 my-4"></div>
      ) : (
        <div className="w-full rounded-[10px] p-4 my-4 border border-sky-600 bg-sky-600/10 animate-dialog-slide-down">
          <div className="flex gap-10">
            <div className="flex items-center gap-4 border-r border-gray-300 pr-4">
              <div
                className={`w-10 h-10 bg-gradient rounded-full flex justify-center text-sm font-semibold items-center`}
              >
                <span>
                  {user?.fName?.charAt(0)}
                  {user?.lName?.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-neutral-400 text-sm">name</div>
                <div>
                  {user?.fName} {user?.lName}
                </div>
              </div>
            </div>

            <div className="border-r border-gray-300 pr-4">
              <div className="text-neutral-400 text-sm">Role</div>
              <MiniChip status={user?.businessRole?.name || ""} />
            </div>
            <div className="border-r border-gray-300 pr-4">
              <div className="text-neutral-400 text-sm">Total Task</div>
              <div>{userTaskList.length}</div>
            </div>
            <div className="">
              <div className="text-neutral-400 text-sm">
                Today Assigned Task as {new Date().toDateString()}
              </div>
              <div>{Todaytasks.length}</div>
            </div>
          </div>
        </div>
      )}
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
                  className="text-xs rounded spcBNS bg-white p-4 animate-fadeIn"
                >
                  <div className="text-sm text-gray-400">
                    Product & Task Name
                  </div>
                  <div className="text-base capitalize">{task.title}</div>
                  <MiniChip status={task.status} size="small" />
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default TimeSheet;
