import { StepFormData } from "@/lib/storage";
import React from "react";

type DocumentDetailsChipProps = {
  formData: StepFormData;
};

const DocumentDetailsChip: React.FC<DocumentDetailsChipProps> = ({
  formData,
}) => {
  return (
    <div className="p-4 rounded-[10px]  shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-cyan-500/5 animate-dialog-slide-down">
      <div className="capitalize ">Template Details</div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-sm text-neutral-400 capitalize mb-2">
            Reference Document
          </div>
          <div className=" capitalize ">
            {formData.stepReference?.referenceName}
          </div>
        </div>
        <div>
          <div className="text-sm text-neutral-400 capitalize mb-2">
            Country
          </div>
          <div className=" capitalize ">
            {formData.stepReference?.countryName}
          </div>
        </div>
        <div>
          <div className="text-sm text-neutral-400 capitalize mb-2">
            Template
          </div>
          <div className=" capitalize ">
            {formData.stepTemplate?.templateName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsChip;
