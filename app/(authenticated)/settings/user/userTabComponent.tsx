import React from "react";
import UsersTable from "./usersTable";

type UserTabComponentProps = {};

const UserTabComponent: React.FC<UserTabComponentProps> = (props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Security Preferences</div>
        <div className="tex-base font-normal">Manage your account security</div>
      </div>
      <UsersTable
        data={[{ plan: "sdf", _id: "asd", duration: "adsvf", price: "ascdv" }]}
      />
    </div>
  );
};

export default UserTabComponent;
