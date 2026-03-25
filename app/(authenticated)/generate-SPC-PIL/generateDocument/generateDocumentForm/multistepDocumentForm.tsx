"use client";

import StepDataInput from "./forms/StepDataInput";
import Step2 from "./forms/SelectTemplate";
import Stepper from "./stepper/stepper";
import { StepperProvider, useStepper } from "./stepper/stepperContext,";
import SelectTemplate from "./forms/SelectTemplate";
import SelectReference from "./forms/SelectReference";
import GenerateTemplate from "./forms/GenerateTemplate";

function FormController() {
  const { step } = useStepper();

  switch (step) {
    case 1:
      return <SelectReference />;
    case 2:
      return <SelectTemplate />;
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
      <div className="max-w-xl mx-auto mt-10">
        <Stepper />
      </div>
      <div>
        <FormController />
      </div>
    </StepperProvider>
  );
}
