"use client";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import ModalProvider from "@/components/dialog/Dialog";
import { useDialog } from "@/components/hooks/DialogProvider";
import RoleTableSkeleton from "@/components/common/skletons/tableSkeleton";
import { RolesManagementColumns } from "@/lib/utils";
import AddEditRoleForm from "./addEditRoleForm";
import { GetRolesResponse } from "@/lib/redux/apiTypes";
import MiniChip from "@/components/common/miniChip";
import DeleteRoleDialog from "./deleteRoleDialog";
import { useAuth } from "@/lib/AuthProvider";

type Props = {
  data?: GetRolesResponse["data"];
  isLoading?: boolean;
};

const RolesTable: React.FC<Props> = ({ data = [], isLoading = false }) => {
  const { canDoAction, isSuperAdmin } = useAuth();
  const { openDrawer } = useDrawer();
  const { openDialog } = useDialog();

  if (isLoading) return <RoleTableSkeleton />;

  return (
    <div className="w-full overflow-x-auto">
      <div className="table-container">
        {/* Header */}
        <div className="grid grid-cols-4 table-header">
          {RolesManagementColumns.map((p: any, index: number) => (
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
                } grid-cols-4 border-slate-300 text-sm`}
              >
                <div className="table-body-cell">{item?.name}</div>
                <div className="table-body-cell">{item?.description}</div>
                <div className="table-body-cell flex items-center gap-2">
                  {item?.permissions.map((p, i) => (
                    <MiniChip size="small" status={p.type} key={i} />
                  ))}
                </div>

                <div className="table-body-actionCell">
                  {(canDoAction(item.createdById || "") || isSuperAdmin) && (
                    <>
                      <div
                        className="custom-button-hover-classes border bg-white p-2 border-gray-200"
                        onClick={() =>
                          openDrawer({
                            title: "Update Role",
                            children: <AddEditRoleForm role={item} />,
                          })
                        }
                      >
                        <FiEdit size={20} />
                      </div>
                      <div
                        className="custom-button-hover-classes border p-2 bg-white border-red-400 text-red-400"
                        onClick={() =>
                          openDialog({
                            children: (
                              <ModalProvider
                                title="Delete Role"
                                size="md:w-200 w-11/12"
                              >
                                <DeleteRoleDialog
                                  Id={item.id}
                                  Name={item.name}
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

export default RolesTable;
