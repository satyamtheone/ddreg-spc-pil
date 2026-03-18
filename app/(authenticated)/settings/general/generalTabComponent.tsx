import React from "react";
import GeneralForm from "./generalForm";

type GeneralTabComponentProps = {};

const GeneralTabComponent: React.FC<GeneralTabComponentProps> = (props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Regional Settings</div>
        <div className="tex-base font-normal">
          Configure default regional preferences
        </div>
        <div></div>
      </div>
      <GeneralForm />
    </div>
  );
};

export default GeneralTabComponent;
