import MiniChip from "@/components/common/miniChip";
import React from "react";
import ContentBoxes from "./contetntBoxes";
import { GoChecklist } from "react-icons/go";
import { StepFormData } from "@/lib/storage";

type GenerateDocumentStepDetailsProps = {
  formData: StepFormData;
};

const GenerateDocumentStepDetails: React.FC<
  GenerateDocumentStepDetailsProps
> = ({ formData }) => {
  return (
    <div className="flex flex-col gap-4">
      {" "}
      <div className="p-4 rounded-[10px] shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-50">
        <div>Reference Document</div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Reference Document</div>
            <div>{formData.stepReference?.referenceName}</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Active Ingredient</div>
            <div>{formData.stepReference?.activeIngredient}</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Document Type</div>
            <div>
              <MiniChip status={formData.stepReference?.type || ""} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Version</div>
            <div className="flex gap-2 items-center">
              1.0 <MiniChip status={"Latest"} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-[10px] shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-50">
        <div>Template & Region</div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Country</div>
            <div>{formData.stepReference?.countryName}</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Template</div>
            <div>{formData.stepTemplate?.templateName}</div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Version</div>
            <div className="flex gap-2 items-center">
              1.0 <MiniChip status={"Latest"} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm text-neutral-400 ">Status</div>
            <div>
              <MiniChip status={"Approved"} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-[10px] spcBNS">
        <div className="text-xl font-medium mb-4">Product Information</div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 w-full justify-evenly">
            <ContentBoxes
              title="Brand Name"
              subTitle={formData.basicInformation?.brandName}
            />
            <ContentBoxes
              title="Strength"
              subTitle={formData.basicInformation?.strength}
            />
            <ContentBoxes
              title="Dosage Form"
              subTitle={formData.basicInformation?.dosageForm}
            />
            <ContentBoxes
              title="Manufacturer"
              subTitle={formData.basicInformation?.manufacturer}
            />
            <ContentBoxes
              title="Shelf Life"
              subTitle={formData.basicInformation?.shelfLife}
            />
          </div>
          <div className="flex gap-4">
            <ContentBoxes
              title="MAH Address"
              subTitle={formData.basicInformation?.MAHAddress}
            />
            <ContentBoxes
              title="Storage Precautions*"
              subTitle={formData.basicInformation?.storagePrecautions}
            />
            <ContentBoxes
              title="Packaging Details*"
              subTitle={formData.basicInformation?.packagingDetails}
            />
          </div>
        </div>
      </div>
      {formData.basicInformation && (
        <div className="p-4  rounded-md shadow-md shadow-emerald-100 border-emerald-500 border flex gap-2 items-center bg-emerald-50">
          <div className="flex justify-center items-center h-14 w-14 bg-emerald-100 rounded-[10px]">
            <GoChecklist className="text-green-600" strokeWidth={1} size={36} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-zinc-800 ">Ready to Generate</div>
            <div className="text-zinc-800 text-sm">
              This is the current approved template for{" "}
              <strong>{formData.stepReference?.countryName}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateDocumentStepDetails;
