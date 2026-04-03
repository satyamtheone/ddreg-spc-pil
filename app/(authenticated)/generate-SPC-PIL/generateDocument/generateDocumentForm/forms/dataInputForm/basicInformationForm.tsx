import FormikInput from "@/components/FormikComponents/FormikInput";
import React from "react";
import { useStepper } from "../../stepper/stepperContext,";
import DynamicButton from "@/components/common/DynamicButton";

type BasicInformationFormProps = {};

const BasicInformationForm: React.FC<BasicInformationFormProps> = (props) => {
  const { formData, updateData, setStep } = useStepper();

  return (
    <div className="spcBNS p-4 rounded-[10px] ">
      <div className="text-xl mb-4">Basic Information</div>
      <div className="grid grid-cols-2 gap-x-4">
        <FormikInput
          name="fillData"
          placeholder="e.g. Aspirin Plus"
          label="Brand Name"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. 100mg"
          label="Strength"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. Tablet, Capsule"
          label="Dosage Form"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. Tablet, Capsule"
          label="Manufacturer"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. 3 Years"
          label="Shelf Life"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. Do not store above 25°C."
          label="Storage Precautions"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. Bristol Laboratories Ltd  Unit 3, Canalside,..."
          label="MAH Address"
        />
        <FormikInput
          name="fillData"
          placeholder="e.g. Blister pack of 30 tablets"
          label="Packaging Details"
        />
      </div>
      <div className="flex justify-end w-full">
        <div>
          <DynamicButton text="Save to Local Storage" variant="submit" />
        </div>
      </div>
    </div>
  );
};

export default BasicInformationForm;
