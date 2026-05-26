"use client";
import WorkFlowStatsCard from "./workFlowStatsCard";
import WorkFlowTaskColumns from "./workFlowTaskColumns";
import DynamicButton from "@/components/common/DynamicButton";
import { PlusSquare } from "lucide-react";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import CreateTaskDrawer from "./tasks/createTaskDrawer";
import { useGetTaskQuery } from "@/lib/redux/slices/workflowApis";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { useAuth } from "@/lib/AuthProvider";
import SearchForm from "@/components/FormikComponents/SearchForm";
import SelectForm from "@/components/FormikComponents/SelectForm";
import WorkfloStats from "./workflowStats";
import { mapTasksToUserOptions } from "@/lib/utilMethods";
import { useMemo, useState } from "react";
import WorkflowStatsSkeleton from "@/components/common/skletons/workflowstatSkeleton";
import { WorkFlowSearchParams } from "./page";

export default function WorkflowManagement({
  params,
}: {
  params: WorkFlowSearchParams;
}) {
  const query = useGetTaskQuery();
  const tasks = useQueryErrorHandler(query, "Get Tasks");
  const users = mapTasksToUserOptions(tasks);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { isUser } = useAuth();
  const [searchText, setSearchText] = useState("");

  const filteredTasks = useMemo(() => {
    if (!tasks?.data) return [];

    const query = searchText?.toLowerCase().trim();

    return tasks.data.filter((task) => {
      const matchesUser = selectedUserId
        ? task.assignments?.some((a) => a.user.id === selectedUserId)
        : true;
      const matchesSearch = query
        ? // task fields
          task.title?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.taskType?.toLowerCase().includes(query) ||
          task.assignments?.some((a) =>
            `${a.user.fName} ${a.user.lName}`.toLowerCase().includes(query),
          )
        : true;

      return matchesUser && matchesSearch;
    });
  }, [tasks, selectedUserId, searchText]);

  const { openDrawer } = useDrawer();
  return (
    <div>
      {query.isLoading ? (
        <WorkflowStatsSkeleton />
      ) : (
        <div>
          <WorkfloStats tasks={filteredTasks} />
          <div className="p-4 pb-0 w-full spcBNS bg-white rounded-[10px] flex justify-end gap-4 my-4">
            <SearchForm
              value={searchText}
              placeholder="Search anything"
              onSearchChange={(val) => setSearchText(val)}
            />
            <SelectForm
              name="country"
              labelText="user"
              options={users}
              onChange={(val) => setSelectedUserId(val as string)}
            />

            {!isUser && (
              <div className="min-w-max">
                <DynamicButton
                  text="Create Task"
                  variant="submit"
                  className="px-2"
                  icon={<PlusSquare />}
                  onClick={() =>
                    openDrawer({
                      title: "Create Task",
                      width: "w-2/3",
                      children: <CreateTaskDrawer />,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="h-140 overflow-hidden">
        <WorkFlowTaskColumns
          params={params}
          tasks={filteredTasks || []}
          isLoading={query.isLoading}
        />
      </div>
    </div>
  );
}
