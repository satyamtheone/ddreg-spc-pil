import { useGetTemplateByIdQuery } from "@/lib/redux/slices/templateApi";
import React from "react";
import TemplateSections from "./templatSections";
import ContentBoxes from "../generate-SPC-PIL/generateDocument/generateDocumentForm/forms/contetntBoxes";

type ViewTemplateDrawerProps = {
  templateId: string;
};

const ViewTemplateDrawer: React.FC<ViewTemplateDrawerProps> = ({
  templateId,
}) => {
  const { data } = useGetTemplateByIdQuery(templateId);

  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="flex flex-col gap-4  ">
        <div className="grid grid-cols-2  gap-4">
          <ContentBoxes
            title="Country / Authority"
            subTitle={data?.data?.type?.country?.code}
          />
          <ContentBoxes title="Author" subTitle="United Kingdom" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ContentBoxes title="Approval Date" subTitle="MHRA" />
          <ContentBoxes title="Document Type" chipText="SPC" />
          <ContentBoxes title="Version" subTitle="3.1" chipText="Latest" />
        </div>
      </div>

      <TemplateSections data={data?.data} />
    </div>
  );
};

export default ViewTemplateDrawer;
