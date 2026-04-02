import PageHeader from "@/components/common/pageHeader";
import WorkFlowStatsCard, { variantStyles } from "./workFlowStatsCard";

export const metadata = {
  title: "Workflow Management",
  description: "Workflow Management for SPC - PIL",
};
{
  /* type Variant = "sky" | "amber" | "emerald" | "indigo"; */
}
export default function WorkflowManagement() {
  return (
    <div>
      <PageHeader
        title="Workflow Management"
        subTitle="Track and Manage document generation tasks"
      />
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

      <div className="grid grid-cols-4 gap-4 my-6">
        <div
          className={`${variantStyles["sky"].bg} ${variantStyles["sky"].border} border h-4  col-span-1`}
        >
          sdef
        </div>
        <div
          className={`${variantStyles["emerald"].bg} ${variantStyles["emerald"].border} border h-4  col-span-1`}
        >
          sdef
        </div>
      </div>
    </div>
  );
}
