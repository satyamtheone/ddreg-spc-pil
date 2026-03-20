"use client";
import React, { useEffect, useMemo } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikComponents/FormikInput";
import FormikToggle from "@/components/FormikComponents/FormikToggle";
import DynamicButton from "@/components/common/DynamicButton";
import toast from "react-hot-toast";
import {
  useCreateRoleMutation,
  useGetRolePermissionsQuery,
  useUpdateRoleMutation,
} from "@/lib/redux/slices/userApi";
import { createRoleValidationSchema } from "@/lib/utilsSchema";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { GetRolesResponse } from "@/lib/redux/apiTypes";

type Permission = {
  id: string;
  type: string;
};

type FormValues = {
  roleName: string;
  description: string;
  permissions: Record<string, boolean>;
};

const AddEditRoleForm = ({
  role,
  actionType,
}: {
  role?: GetRolesResponse["data"][number];
  actionType?: "add";
}) => {
  const { closeDrawer } = useDrawer();
  const { data, isLoading: isFetching } = useGetRolePermissionsQuery();
  const [createRole, { isLoading, isError, error }] = useCreateRoleMutation();
   const [updateRole, { isLoading:updateLoading, isError:updateError, error:updateerror }] = useUpdateRoleMutation();
  const permissionsData: Permission[] = data?.data || [];

  const selectedPermissionIds = useMemo(() => {
    return new Set(role?.permissions?.map((p) => p.id) || []);
  }, [role]);

  const initialPermissions = useMemo(() => {
    const obj: Record<string, boolean> = {};

    permissionsData.forEach((perm) => {
      obj[perm.id] = selectedPermissionIds.has(perm.id);
    });

    return obj;
  }, [permissionsData, selectedPermissionIds]);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const selectedPermissionIds = Object.entries(values.permissions)
      .filter(([_, v]) => v)
      .map(([id]) => id);

    const payload = {
      name: values.roleName,
      description: values.description,
      permissionIds: selectedPermissionIds,
    };
    try {
      if(actionType == "add") {
        const res = await updateRole({ id: role?.id || "", body: payload }).unwrap();
        toast.success(res?.message || `${values.roleName} updated successfully`);
      } else {
        const res = await createRole(payload).unwrap();
        toast.success(res?.message || "Role created successfully");
      }
    
      closeDrawer();
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create role");
    }
  };

  useEffect(() => {
    if (isError || updateError) {
      toast.error(
        (error || (updateerror as any))?.data?.message || "Update failed",
      );
    }
  }, [isError, error, updateerror]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        roleName: role?.name || "",
        description: role?.description || "",
        permissions: initialPermissions,
      }}
      validationSchema={createRoleValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, dirty, isValid }) => {
        return (
          <Form className="space-y-6 mt-4">
            <div className="p-4 border rounded-xl space-y-4 spcBNS">
              <h2 className="font-semibold text-lg">Role</h2>

              {/* Inputs */}
              <FormikInput
                label="Role Name"
                name="roleName"
                placeholder="Enter Role Name"
              />

              <FormikInput
                label="Description"
                name="description"
                placeholder="Enter Description"
              />

              {/* Permissions */}
              <div className="space-y-3">
                <div className="text-sm font-medium">Permissions</div>
                {isFetching ? (
                  <div className="h-10 skeleton"></div>
                ) : (
                  <div className="flex flex-wrap gap-6 py-4 animate-dialog-slide-down">
                    {permissionsData.map((perm) => (
                      <div key={perm.id} className="flex items-center gap-2">
                        <span>
                          {perm.type.charAt(0) +
                            perm.type.slice(1).toLowerCase()}
                        </span>

                        <FormikToggle
                          name={`permissions.${perm.id}`}
                          disabled={isLoading}
                          onChange={(checked) =>
                            setFieldValue(`permissions.${perm.id}`, checked)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* ✅ Permission Error */}
                {/* {errors.permissions && touched.permissions && (
                  <div className="text-red-500 text-sm">
                    {errors.permissions}
                  </div>
                )} */}
              </div>
            </div>

            {/* Footer Button */}
            <div className="absolute left-0 right-0 bg-white border-t border-gray-300 bottom-0">
              <div className="w-full p-4">
                <DynamicButton
                  variant="submit"
                  isSubmitting={isLoading || !dirty || !isValid}
                  text={
                    actionType === "add"
                      ? isLoading
                        ? "Adding Role..."
                        : "Add Role"
                      : updateLoading
                        ? "Updating Role..."
                        : "Update Role"
                  }
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditRoleForm;
