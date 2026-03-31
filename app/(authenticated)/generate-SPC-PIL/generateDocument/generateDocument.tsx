import PageHeader from "@/components/common/pageHeader";
import React from "react";
import MultistepDocumentForm from "./generateDocumentForm/multistepDocumentForm";

type GenerateDocumentProps = {
  referenceId: string | undefined;
};

const GenerateDocument: React.FC<GenerateDocumentProps> = ({ referenceId }) => {
  return (
    <div>
      <PageHeader
        title="Generate SPC/PIL"
        subTitle="Customize the document with your product information"
      />
      {referenceId}
      <div className="flex flex-col gap-4 spcBNS bg-white rounded-[10px] p-4">
        <MultistepDocumentForm />
      </div>
    </div>
  );
};

export default GenerateDocument;
