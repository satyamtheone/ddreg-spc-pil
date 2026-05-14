import WorkflowManagement from "./workflowManagement";

export type WorkFlowSearchParams = {
  documentVersionId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<WorkFlowSearchParams>;
}) {
  const params = await searchParams;

  return <WorkflowManagement params={params} />;
}
