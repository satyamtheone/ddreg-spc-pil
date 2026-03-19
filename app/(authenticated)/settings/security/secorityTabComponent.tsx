import React from "react";
import UpdatePasswordForm from "./updatePasswordForm";
import TwoFactorFrom from "./twoFactorFrom";
import AutoLogoutForm from "./autoLogoutForm";

type SecorityTabComponentProps = {};

const SecorityTabComponent: React.FC<SecorityTabComponentProps> = (props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Security Preferences</div>
        <div className="tex-base font-normal">Manage your account security</div>
      </div>
      <hr />
      <TwoFactorFrom />
      <hr />
      <AutoLogoutForm />
      <hr />
      <UpdatePasswordForm />
    </div>
  );
};

export default SecorityTabComponent;
