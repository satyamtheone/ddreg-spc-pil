"use client";
import React, { useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { countries, languages, timeZones } from "@/lib/utils";
import DynamicButton from "@/components/common/DynamicButton";
import { generalFormScheme } from "@/lib/utilsSchema";
import FormikSelect from "@/components/FormikComponents/FormikSelect";
import { useUpdatePreferencesMutation } from "@/lib/redux/slices/userApi";
import GeneralSkeleton from "@/components/common/skletons/generalSkeleton";
import { useAuth } from "@/lib/AuthProvider";

// ---- TYPES ----
type FormValues = {
  country?: string;
  language?: string;
  timeZone?: string;
};

const GeneralForm = () => {
  const { user, isUserLoading, refreshUser } = useAuth();
  const [updatePreferences, { isLoading, isError, error }] =
    useUpdatePreferencesMutation();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value),
      );
      const res = await updatePreferences(payload).unwrap();
      refreshUser();
      toast.success(res.message || "Preferences updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Update failed");
    }
  }, [isError, error]);

  return (
    <>
      {isUserLoading ? (
        <GeneralSkeleton />
      ) : (
        <Formik<FormValues>
          initialValues={{
            country: user?.country || "",
            language: user?.language || "",
            timeZone: user?.timeZone || "",
          }}
          validationSchema={generalFormScheme}
          onSubmit={onSubmit}
        >
          {({ dirty, errors, isSubmitting }) => (
            <div className="w-full animate-fadeIn">
              <Form className="w-full flex flex-col gap-2">
                {/* Country */}
                <FormikSelect
                  name="country"
                  label="Default Country"
                  options={countries}
                />

                {/* Language */}
                <FormikSelect
                  name="language"
                  label="Language"
                  options={languages}
                />

                {/* TimeZone */}
                <FormikSelect
                  name="timeZone"
                  label="Time Zone"
                  options={timeZones}
                />

                {/* Submit */}
                <div className="flex w-full justify-end">
                  <div>
                    <DynamicButton
                      variant="submit"
                      text={isLoading ? "Updating..." : "Update"}
                      isSubmitting={
                        isLoading ||
                        isSubmitting ||
                        !dirty ||
                        Object.keys(errors).length > 0
                      }
                    />
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default GeneralForm;
