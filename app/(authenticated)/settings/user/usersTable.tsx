"use client";

import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import ModalProvider from "@/components/dialog/Dialog";
import { useDialog } from "@/components/hooks/DialogProvider";
import RoleTableSkeleton from "@/components/common/skletons/tableSkeleton";
import { UserManagementColumns } from "@/lib/utils";
import AddEditUserForm from "./addEditUserForm";
import { GetUserResponse } from "@/lib/redux/apiTypes";
import { useAuth } from "@/lib/AuthProvider";
import DeleteUserDialog from "./deleteUserDialog";

type Props = {
  data?: GetUserResponse["data"];
  isLoading?: boolean;
  companyList?: any;
};

const UsersTable: React.FC<Props> = ({ data = [], isLoading = false }) => {
  const { canDoAction } = useAuth();
  const { openDrawer } = useDrawer();
  const { openDialog } = useDialog();

  if (isLoading) return <RoleTableSkeleton />;

  return (
    <div className="w-full overflow-x-auto">
      <div className="table-container">
        {/* Header */}
        <div className="grid grid-cols-6 table-header">
          {UserManagementColumns.map((p: any, index: number) => (
            <div key={index} className="table-header-cell">
              {p.name}
            </div>
          ))}

          <div className="table-header-lastCell">Action</div>
        </div>

        {/* Rows */}
        <div className="table-body">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={item.id}
                className={`${index % 2 === 0 ? "bg-purple-50" : ""} ${
                  index + 1 === data.length ? "" : "border-b"
                } transition-colors duration-150 group grid ${
                  isLoading
                    ? "pointer-events-none animate-pulse opacity-20"
                    : ""
                } grid-cols-6 border-slate-300 text-sm`}
              >
                <div className="table-body-cell">{item?.fName}</div>
                <div className="table-body-cell">{item?.lName}</div>
                <div className="table-body-cell">{item?.email}</div>
                <div className="table-body-cell">{item?.role}</div>
                <div className="table-body-cell">
                  {item?.businessRole?.name}
                </div>

                <div className="table-body-actionCell">
                  {canDoAction(item.createdById || "") && (
                    <>
                      <div
                        className="custom-button-hover-classes border p-2 border-gray-200"
                        onClick={() =>
                          openDrawer({
                            title: "Add User",
                            children: <AddEditUserForm user={item} />,
                          })
                        }
                      >
                        <FiEdit size={20} />
                      </div>

                      <div
                        className="custom-button-hover-classes border p-2 border-red-400 text-red-400"
                        onClick={() =>
                          openDialog({
                            children: (
                              <ModalProvider
                                title="Delete User"
                                size="md:w-200 w-11/12"
                              >
                                <DeleteUserDialog
                                  Id={item.id}
                                  Name={item.fName}
                                />
                              </ModalProvider>
                            ),
                          })
                        }
                      >
                        <RiDeleteBinLine size={20} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center border border-gray-200">
              No data found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
