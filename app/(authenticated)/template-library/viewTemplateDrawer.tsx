import { useGetTemplateByIdQuery } from "@/lib/redux/slices/templateApi";
import React from "react";
import TemplateSections from "./templatSections";
import ContentBoxes from "../generate-SPC-PIL/generateDocument/generateDocumentForm/forms/contetntBoxes";
import { formatedDate } from "@/lib/utilMethods";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import TemplateDrawerSkeleton from "@/components/common/skletons/templateDrwaerSkeleton";

type ViewTemplateDrawerProps = {
  templateId: string;
};

const ViewTemplateDrawer: React.FC<ViewTemplateDrawerProps> = ({
  templateId,
}) => {
  const query = useGetTemplateByIdQuery(templateId);
  const data = useQueryErrorHandler(query, "Get Template By Id");
  return (
    <div className="flex flex-col gap-6 mt-4 h-full">
      {query.isLoading ? (
        <TemplateDrawerSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-4 animate-dialog-slide-down  ">
            <div className="grid grid-cols-2  gap-4">
              <ContentBoxes
                title="Country / Authority"
                subTitle={data?.data?.type?.country?.name}
              />
              <ContentBoxes
                title="SourceType"
                subTitle={data?.data?.sourceType}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ContentBoxes
                title="Approval Date"
                subTitle={formatedDate(data?.data?.updatedAt || "")}
              />
              <ContentBoxes
                title="Document Type"
                chipText={data?.data?.schemaMeta?.type}
              />
              <ContentBoxes
                title="Version"
                subTitle={data?.data?.version}
                chipText="Latest"
              />
            </div>
          </div>

          <TemplateSections data={data?.data} />
        </>
      )}
    </div>
  );
};

export default ViewTemplateDrawer;
