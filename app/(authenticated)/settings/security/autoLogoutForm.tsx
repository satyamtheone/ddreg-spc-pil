"use client";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import FormikToggle from "@/components/FormikComponents/FormikToggle";
import toast from "react-hot-toast";
import { useAutoLogoutMutation } from "@/lib/redux/slices/authApi";

type Props = {
  initialValue?: boolean;
};

type FormValues = {
  enabled: boolean;
};

const AutoLogoutForm: React.FC<Props> = ({ initialValue = false }) => {
  const [twoFactorVerify, { isLoading }] = useAutoLogoutMutation();

  const handleToggleChange = async (
    checked: boolean,
    setFieldValue: FormikHelpers<FormValues>["setFieldValue"],
  ) => {
    setFieldValue("enabled", checked);

    try {
      const res = await twoFactorVerify({
        enabled: checked,
      }).unwrap();

      toast.success(res?.message || "Auto logout updated successfully");
    } catch (error: any) {
      setFieldValue("enabled", !checked); // revert

      toast.error(
        error?.data?.message || "Failed to update Auto logout authentication",
      );
    }
  };

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        enabled: Boolean(initialValue),
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <div className="w-full flex justify-between items-center animate-dialog-slide-down">
          <div className="flex flex-col gap-1">
            <div className="text-base font-medium">Auto Logout</div>
            <div className="tex-base font-normal">
              Logout after period of inactivity
            </div>
          </div>
          <FormikToggle
            label={values.enabled ? "Disable" : "Enable"}
            name="enabled"
            disabled={isLoading}
            onChange={(checked) => handleToggleChange(checked, setFieldValue)}
          />
        </div>
      )}
    </Formik>
  );
};

export default AutoLogoutForm;
