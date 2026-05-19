import React from "react";
import WorkFlowStatsCard from "./workFlowStatsCard";
import { GetTaskResponse, Task } from "@/lib/redux/apiTypes";

type WorkfloStatsProps = {
  tasks: Task[];
}; 

const WorkfloStats: React.FC<WorkfloStatsProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <WorkFlowStatsCard
        variant="sky"
        title="Total Task"
        statValue={tasks?.length || 0}
        subtitle="Last 30 Days"
      />
      <WorkFlowStatsCard
        variant="amber"
        title="Pending Task"
        statValue={
          tasks?.filter((p) => ["CREATED"].includes(p.status)).length || 0
        }
        subtitle="Last 30 Days"
      />
      <WorkFlowStatsCard
        variant="emerald"
        title="Completed Task"
        statValue={tasks?.filter((p) => p.status === "APPROVED").length || 0}
        subtitle="Last 30 Days"
      />
      <WorkFlowStatsCard
        variant="indigo"
        title="Active Workflow"
        statValue={
          tasks?.filter((p) =>
            ["UNDER_REVIEW", "UNDER_EDITING", "UNDER_APPROVAL"].includes(
              p.status,
            ),
          ).length || 0
        }
        subtitle="Last 30 Days"
      />
    </div>
  );
};

export default WorkfloStats;
