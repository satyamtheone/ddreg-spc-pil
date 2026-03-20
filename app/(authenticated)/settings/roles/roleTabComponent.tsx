import React from "react";
import UsersTable from "../user/usersTable";
import DynamicButton from "@/components/common/DynamicButton";
import AddEditRoleForm from "./addEditRoleForm";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import RolesTable from "./rolesTable";
import { useGetMeQuery, useGetRolesQuery } from "@/lib/redux/slices/userApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import RoleTableSkeleton from "@/components/common/skletons/tableSkeleton";

type RoleTabComponentProps = {};

const RoleTabComponent: React.FC<RoleTabComponentProps> = () => {
  const { openDrawer } = useDrawer();
  const query = useGetRolesQuery();
  const data = useQueryErrorHandler(query, "Get Roles");
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
                children: <AddEditRoleForm actionType="add" />,
              })
            }
          />
        </div>
      </div>
      {query.isLoading || query.isFetching ? (
        <RoleTableSkeleton />
      ) : (
        <RolesTable data={data?.data} />
      )}
    </div>
  );
};

export default RoleTabComponent;
