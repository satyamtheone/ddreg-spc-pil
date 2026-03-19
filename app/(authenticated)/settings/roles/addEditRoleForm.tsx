"use client";
import React, { useMemo } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikComponents/FormikInput";
import FormikToggle from "@/components/FormikComponents/FormikToggle";
import DynamicButton from "@/components/common/DynamicButton";
import toast from "react-hot-toast";
import {
  useCreateRoleMutation,
  useGetRolePermissionsQuery,
} from "@/lib/redux/slices/userApi";
import { createRoleValidationSchema } from "@/lib/utilsSchema";

type Permission = {
  id: string;
  type: string;
};

type FormValues = {
  name: string;
  description: string;
  permissions: Record<string, boolean>;
};

const AddEditRoleForm = () => {
  const { data, isLoading: isFetching } = useGetRolePermissionsQuery();

  const [createRole, { isLoading }] = useCreateRoleMutation();

  const permissionsData: Permission[] = data?.data || [];

  /**
   * ✅ Create dynamic initial values from API
   */
  const initialPermissions = useMemo(() => {
    const obj: Record<string, boolean> = {};
    permissionsData.forEach((perm) => {
      obj[perm.id] = false; // default OFF
    });
    return obj;
  }, [permissionsData]);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    /**
     * ✅ Extract selected permission IDs
     */
    const selectedPermissions = Object.entries(values.permissions)
      .filter(([_, v]) => v)
      .map(([id]) => id);

    const payload = {
      name: values.name,
      description: values.description,
      permissions: selectedPermissions,
    };

    try {
      const res = await createRole(payload).unwrap();
      toast.success(res?.message || "Role created successfully");
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create role");
    }
  };

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        name: "",
        description: "",
        permissions: initialPermissions,
      }}
      validationSchema={createRoleValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-6">
          {/* Role Box */}
          <div className="p-4 border rounded-xl space-y-4">
            <h2 className="font-semibold text-lg">Role</h2>

            <FormikInput name="name" placeholder="Enter Role Name" />

            <FormikInput name="description" placeholder="Enter Description" />
            <FormikInput name="roleName" placeholder="Enter Role Name" />

            {/* Permissions */}
            <div className="space-y-3">
              <div className="text-sm font-medium">Permissions</div>

              <div className="flex flex-wrap gap-6">
                {permissionsData.map((perm) => (
                  <div key={perm.id} className="flex items-center gap-2">
                    <span>
                      {perm.type.charAt(0) + perm.type.slice(1).toLowerCase()}
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
            </div>
          </div>
          {/* Submit */}
          <DynamicButton
            variant="submit"
            isSubmitting={isLoading}
            text="Add Role"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddEditRoleForm;
