"use client";
import Stepper from "./stepper/stepper";
import { StepperProvider, useStepper } from "./stepper/stepperContext,";
import GenerateTemplate from "./forms/GenerateTemplate";
import SelectReferenceForm from "./forms/SelectReferenceForm";
import SelectTemplateForm from "./forms/SelectTemplateForm";
import { useSearchParams } from "next/navigation";
import StepDataInputForm from "./forms/dataInputForm/StepDataInputForm";

function FormController({ referenceId }: { referenceId: string }) {
  const searchParams = useSearchParams();
  const template = searchParams.get("templateId");
  const templateId = template ? template : "";
  const { step } = useStepper();

  switch (step) {
    case 1:
      return <SelectReferenceForm referenceId={referenceId} />;
    case 2:
      return <SelectTemplateForm templateId={templateId} />;
    case 3:
      return <StepDataInputForm />;
    case 4:
      return <GenerateTemplate />;
    default:
      return null;
  }
}

export default function MultistepDocumentForm({
  referenceId,
}: {
  referenceId: string;
}) {
  return (
    <StepperProvider>
      <div className="max-w-xl mx-auto animate-dialog-slide-down ">
        <Stepper />
      </div>
      <div className="animate-dialog-slide-down">
        <FormController referenceId={referenceId || ""} />
      </div>
    </StepperProvider>
  );
}
