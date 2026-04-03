import FormikInput from "@/components/FormikComponents/FormikInput";
import React from "react";

type BasicInformationFormProps = {};

const BasicInformationForm: React.FC<BasicInformationFormProps> = (props) => {
  return (
    <div className="spcBNS p-4 rounded-[10px]">
      <FormikInput
        name="fillData"
        placeholder="Reference Name"
        label="Reference Name"
      />
    </div>
  );
};

export default BasicInformationForm;
