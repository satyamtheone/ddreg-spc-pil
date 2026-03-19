import React from "react";
import UsersTable from "../user/usersTable";
import DynamicButton from "@/components/common/DynamicButton";
import AddEditRoleForm from "./addEditRoleForm";
import { useDrawer } from "@/components/hooks/DrawerProvider";

type RoleTabComponentProps = {};

const RoleTabComponent: React.FC<RoleTabComponentProps> = () => {
  const { openDrawer } = useDrawer();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Security Preferences</div>
        <div className="tex-base font-normal">Manage your account security</div>
      </div>
      <div className="flex w-full justify-end">
        <div>
          <DynamicButton
            variant="submit"
            text="Add Role"
            onClick={() =>
              openDrawer({
                title: "Add User",
                children: <AddEditRoleForm />,
              })
            }
          />
        </div>
      </div>
      <UsersTable
        data={[{ plan: "sdf", _id: "asd", duration: "adsvf", price: "ascdv" }]}
      />
    </div>
  );
};

export default RoleTabComponent;
