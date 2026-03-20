import React from "react";
import UsersTable from "./usersTable";
import DynamicButton from "@/components/common/DynamicButton";
import { RiAddBoxLine } from "react-icons/ri";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import AddEditUserForm from "./addEditUserForm";
import { useGetUsersQuery } from "@/lib/redux/slices/userApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import RoleTableSkeleton from "@/components/common/skletons/tableSkeleton";

type UserTabComponentProps = {};

const UserTabComponent: React.FC<UserTabComponentProps> = () => {
  const query = useGetUsersQuery();
  const data = useQueryErrorHandler(query, "Get Users");

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
            icon={<RiAddBoxLine size={20} />}
            variant="submit"
            text="Add User"
            onClick={() =>
              openDrawer({
                title: "Add User",
                children: <AddEditUserForm actionType="add" />,
              })
            }
          />
        </div>
      </div>

      {query.isLoading || query.isFetching ? (
        <RoleTableSkeleton />
      ) : (
        <UsersTable data={data?.data} />
      )}
    </div>
  );
};

export default UserTabComponent;
