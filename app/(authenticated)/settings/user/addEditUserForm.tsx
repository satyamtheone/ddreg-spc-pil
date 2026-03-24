"use client";
import { useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";
import toast from "react-hot-toast";
import FormikPassword from "@/components/FormikComponents/FormikPassword";
import {
  useCreateUserMutation,
  useGetRolesQuery,
  useUpdateUserMutation,
} from "@/lib/redux/slices/userApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { User } from "@/lib/redux/apiTypes";
import FormikRadio from "@/components/FormikComponents/FoemikRadio";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import FormRoleSkeleton from "@/components/common/skletons/formRoleSkeleton";
import { createUserValidationSchema } from "@/lib/utilsSchema";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessRole: string;
};

const AddEditUserForm = ({
  user,
  actionType,
}: {
  user?: User;
  actionType?: "add";
}) => {
  const isAddFrom = actionType === "add";
  const { closeDrawer } = useDrawer();
  const query = useGetRolesQuery();
  const data = useQueryErrorHandler(query, "Get Roles");
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const [
    UpdateUser,
    { isLoading: updateLoading, isError: updateError, error: updateerror },
  ] = useUpdateUserMutation();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const formData = new FormData();
    formData.append("fName", values.firstName);
    formData.append("lName", values.lastName);
    if (isAddFrom) {
      formData.append("role", "USER");
      formData.append("email", values.email);
      formData.append("password", values.password);
    }
    formData.append("businessRoleId", values.businessRole);

    try {
      if (isAddFrom) {
        const res = await createUser(formData).unwrap();
        toast.success(res?.message || "User created successfully");
      } else {
        const res = await UpdateUser({
          id: user?.id || "",
          body: formData,
        }).unwrap();
        toast.success(res?.message || "User Updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user");
    } finally {
      closeDrawer();
      resetForm();
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
      initialValues={{
        firstName: user?.fName || "",
        lastName: user?.lName || "",
        email: user?.email || "",
        password: "",
        businessRole: user?.businessRoleId || "",
      }}
      validationSchema={createUserValidationSchema(actionType || "")}
      onSubmit={handleSubmit}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <Form className="space-y-6 mt-4 mb-20">
          <div className="p-4 border rounded-xl space-y-4 spcBNS">
            <h2 className="font-semibold text-lg">User Detail</h2>
            <FormikInput
              label="First Name"
              name="firstName"
              placeholder="Enter First Name"
            />
            <FormikInput
              label="Last Name"
              name="lastName"
              placeholder="Enter Last Name"
            />
            <FormikInput
              disabled={!isAddFrom}
              label="Email"
              name="email"
              placeholder="Enter Email"
              type="email"
            />
            <FormikPassword
              label="Password"
              disabled={!isAddFrom}
              name="password"
              placeholder="Password"
            />
          </div>

          <div className="p-4 border rounded-xl space-y-4 spcBNS max-h-70 overflow-auto">
            <h2 className="font-semibold text-lg">Select Role</h2>
            {query.isFetching ? (
              <FormRoleSkeleton />
            ) : (
              <div className="flex flex-col gap-1">
                {data?.data.map((perm, i) => (
                  <FormikRadio
                    key={i}
                    name="businessRole"
                    label={perm.name}
                    value={perm.id}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
            <div className="w-full p-4">
              <DynamicButton
                variant="submit"
                isSubmitting={isLoading || !dirty || !isValid || isSubmitting}
                text={
                  actionType === "add"
                    ? isLoading
                      ? "Adding User..."
                      : "Add User"
                    : updateLoading
                      ? "Updating User..."
                      : "Update User"
                }
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddEditUserForm;
