import React from "react";
import GeneralForm from "../general/generalForm";
import UpdatePasswordForm from "./updatePasswordForm";

type SecorityTabComponentProps = {};

const SecorityTabComponent: React.FC<SecorityTabComponentProps> = (props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Security Preferences</div>
        <div className="tex-base font-normal">Manage your account security</div>
        <div></div>
      </div>

      <UpdatePasswordForm />
    </div>
  );
};

export default SecorityTabComponent;
