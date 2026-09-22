import FormikInput from "@/components/FormikComponents/FormikInput";
import React from "react";

type BasicInformationFormProps = {};

const BasicInformationForm: React.FC<BasicInformationFormProps> = (props) => {

  return (
    <div className="spcBNS p-4 rounded-[10px] ">
      <div className="text-xl mb-4">Basic Information</div>
      <div className="grid grid-cols-2 gap-x-4">
        <FormikInput
          name="basicInformation.brandName"
          placeholder="e.g. Aspirin Plus"
          label="Brand Name"
        />
        <FormikInput
          name="basicInformation.strength"
          placeholder="e.g. 100mg"
          label="Strength"
        />
        <FormikInput
          name="basicInformation.dosageForm"
          placeholder="e.g. Tablet, Capsule"
          label="Dosage Form"
        />
        <FormikInput
          name="basicInformation.manufacturer"
          placeholder="e.g. Tablet, Capsule"
          label="Manufacturer"
        />
        <FormikInput
          name="basicInformation.shelfLife"
          placeholder="e.g. 3 Years"
          label="Shelf Life"
        />
        <FormikInput
          name="basicInformation.storagePrecautions"
          placeholder="e.g. Do not store above 25°C."
          label="Storage Precautions"
        />
        <FormikInput
          name="basicInformation.MAHAddress"
          placeholder="e.g. Bristol Laboratories Ltd  Unit 3, Canalside,..."
          label="MAH Address"
        />
        <FormikInput
          name="basicInformation.packagingDetails"
          placeholder="e.g. Blister pack of 30 tablets"
          label="Packaging Details"
        />
      </div>
    </div>
  );
};

export default BasicInformationForm;
