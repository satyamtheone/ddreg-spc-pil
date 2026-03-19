"use client";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikComponents/FormikInput";
import FormikToggle from "@/components/FormikComponents/FormikToggle";
import DynamicButton from "@/components/common/DynamicButton";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "@/lib/redux/slices/authApi";
import FormikPassword from "@/components/FormikComponents/FormikPassword";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: {
    editor: boolean;
    reviewer: boolean;
    approver: boolean;
  };
};

const AddEditUserForm = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);

    // Send roles as array
    const selectedRoles = Object.entries(values.roles)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    selectedRoles.forEach((role) => {
      formData.append("roles[]", role);
    });

    try {
      //   const res = await createUser(formData).unwrap();
      //   toast.success(res?.message || "User created successfully");
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user");
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: {
          editor: false,
          reviewer: false,
          approver: false,
        },
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6 mt-4">
          {/* User Details */}
          <div className="p-4 border rounded-xl space-y-4 spcBNS">
            <h2 className="font-semibold text-lg">User Detail</h2>

            <FormikInput name="firstName" placeholder="Enter First Name" />
            <FormikInput name="lastName" placeholder="Enter Last Name" />
            <FormikInput name="email" placeholder="Enter Email" type="email" />
            <FormikPassword name="password" placeholder="Password" />
          </div>

          <div className="p-4 border rounded-xl space-y-4 spcBNS">
            <h2 className="font-semibold text-lg">Select Role</h2>
            <div className="flex justify-between items-center">
              <span>Editor</span>
              <FormikToggle
                name="roles.editor"
                disabled={isLoading}
                onChange={(checked) => setFieldValue("roles.editor", checked)}
              />
            </div>
            <hr />

            <div className="flex justify-between items-center">
              <span>Reviewer</span>
              <FormikToggle
                name="roles.reviewer"
                disabled={isLoading}
                onChange={(checked) => setFieldValue("roles.reviewer", checked)}
              />
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span>Approver</span>
              <FormikToggle
                name="roles.approver"
                disabled={isLoading}
                onChange={(checked) => setFieldValue("roles.approver", checked)}
              />
            </div>
          </div>

          <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
            <div className="w-full p-4">
              <DynamicButton
                variant="submit"
                isSubmitting={isLoading}
                text="Add"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddEditUserForm;
