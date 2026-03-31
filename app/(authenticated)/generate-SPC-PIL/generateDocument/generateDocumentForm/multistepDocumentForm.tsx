"use client";
import StepDataInput from "./forms/StepDataInput";
import Stepper from "./stepper/stepper";
import { StepperProvider, useStepper } from "./stepper/stepperContext,";
import GenerateTemplate from "./forms/GenerateTemplate";
import SelectReferenceForm from "./forms/SelectReferenceForm";
import SelectTemplateForm from "./forms/SelectTemplateForm";

function FormController() {
  const { step } = useStepper();

  switch (step) {
    case 1:
      return <SelectReferenceForm />;
    case 2:
      return <SelectTemplateForm />;
    case 3:
      return <StepDataInput />;
    case 4:
      return <GenerateTemplate />;
    default:
      return null;
  }
}

export default function MultistepDocumentForm() {
  return (
    <StepperProvider>
      <div className="max-w-xl mx-auto animate-dialog-slide-down ">
        <Stepper />
      </div>
      <div className="animate-dialog-slide-down">
        <FormController />
      </div>
    </StepperProvider>
  );
}
