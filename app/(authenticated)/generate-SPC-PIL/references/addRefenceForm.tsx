"use client";
import { useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import DynamicButton from "@/components/common/DynamicButton";
import FormikSelect from "@/components/FormikComponents/FormikSelect";
import FormikInput from "@/components/FormikComponents/FormikInput";
import FormikAwareDocumentUploader from "@/components/FormikComponents/FormikAwareDocumentUploader";
import { LuCloudUpload } from "react-icons/lu";
import {
  useCreateReferenceMutation,
  useGetCountriesQuery,
} from "@/lib/redux/slices/templateApi";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { getCountryLabel, getDocumentOptions } from "@/lib/utilMethods";
import { AddRefenceFormSchema } from "@/lib/utilsSchema";

// ---- TYPES ----
type FormValues = {
  title: string;
  country: string;
  type: string;
  description?: string;
  referenceFile: File | string;
};

const AddRefenceForm = () => {
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const countriesData = data?.data || [];
  const countryOptions = getCountryLabel(countriesData);
  const { closeDrawer } = useDrawer();
  const [createReference, { isLoading, isError, error }] =
    useCreateReferenceMutation();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("country", "EU");
      // {
      //   values.description &&
      //     formData.append("description", values.description || "");
      // }
      formData.append("type", "SMPC");
      formData.append("referenceFile", values.referenceFile);
      const res = await createReference(formData).unwrap();
      closeDrawer();
      toast.success(res.message || "Reference Uploaded ");
    } catch (err: any) {
      toast.error(err?.data?.message || "Reference Uploaded failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Reference Uploaded failed");
    }
  }, [isError, error]);

  return (
    <div>
      <Formik<FormValues>
        initialValues={{
          country: "",
          title: "",
          type: "",
          referenceFile: "",
          description: "",
        }}
        validationSchema={AddRefenceFormSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, errors, isSubmitting, values }) => {
          const typeOptions = getDocumentOptions(countriesData, values.country);
          return (
            <div className="w-full  pt-4  ">
              <Form className="w-full flex flex-col">
                <FormikInput
                  name="title"
                  label="Reference Title*"
                  placeholder="e.g. France SPC Reference"
                />
                <FormikInput
                  name="description"
                  label="Reference Description"
                  placeholder="e.g. France SPC Reference"
                />
                <FormikSelect
                  name="country"
                  label="Country"
                  options={countryOptions}
                />
                {values.country && (
                  <FormikSelect
                    name="type"
                    label="Type"
                    options={typeOptions}
                  />
                )}
                <div className="pt-4">
                  <FormikAwareDocumentUploader name="referenceFile" />
                </div>
                {/* Submit */}
                <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
                  <div className="w-full p-4">
                    <DynamicButton
                      icon={<LuCloudUpload size={24} />}
                      variant="submit"
                      text={isLoading ? "Adding Reference..." : "Add Reference"}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default AddRefenceForm;
