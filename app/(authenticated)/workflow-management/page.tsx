import PageHeader from "@/components/common/pageHeader";
import WorkFlowStatsCard, { variantStyles } from "./workFlowStatsCard";
import WorkFlowTaskColumns from "./workFlowTaskColumns";

export const metadata = {
  title: "Workflow Management",
  description: "Workflow Management for SPC - PIL",
};

export default function WorkflowManagement() {
  return (
    <div>
      <PageHeader
        title="Workflow Management"
        subTitle="Track and Manage document generation tasks"
      />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
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

      <div className="h-20 w-full spcBNS bg-white rounded-[10px] my-6"></div>
      <WorkFlowTaskColumns /> */}
    </div>
  );
}
