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

export default function WorkflowManagement() {
  const { isUser } = useAuth();
  const query = useGetTaskQuery();
  const tasks = useQueryErrorHandler(query, "Get Tasks");
  const { openDrawer } = useDrawer();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <WorkFlowStatsCard
          variant="sky"
          title="Total Task"
          statValue={24}
          subtitle="Last 30 Days"
        />
        <WorkFlowStatsCard
          variant="amber"
          title="Pending Task"
          statValue={12}
          subtitle="Last 30 Days"
        />
        <WorkFlowStatsCard
          variant="emerald"
          title="Completed Task"
          statValue={18}
          subtitle="Last 30 Days"
        />
        <WorkFlowStatsCard
          variant="indigo"
          title="Active Workflow"
          statValue={6}
          subtitle="Last 30 Days"
        />
      </div>

      <div className="p-4 pb-0 w-full spcBNS bg-white rounded-[10px] flex justify-end gap-4 my-4">
        <SearchForm />
        <SelectForm
          name="country"
          labelText="user"
          options={[]}
          value={""}
          // onChange={(val) => update("region", val as string)}
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
      <div className="h-140 overflow-hidden">
        <WorkFlowTaskColumns
          tasks={tasks?.data || []}
          isLoading={query.isLoading}
        />
      </div>
    </div>
  );
}
