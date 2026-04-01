import PageHeader from "@/components/common/pageHeader";

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
      <div>
        <div className="flex justify-between">
          <div>
            <div>24</div>
            <div>Total Task</div>
            <div>Last 30 Days</div>
          </div>
          <div className="h-10 w-10 spcBNS"></div>
        </div>
      </div>
    </div>
  );
}
