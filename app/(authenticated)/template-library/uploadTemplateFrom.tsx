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
  useCreateTemplateMutation,
  useGetCountriesQuery,
} from "@/lib/redux/slices/templateApi";
import { UploadTemplateFromSchema } from "@/lib/utilsSchema";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { getCountryLabel, getDocumentOptions } from "@/lib/utilMethods";

// ---- TYPES ----
type FormValues = {
  title: string;
  country: string;
  type: string;
  description?: string;
  templateFile: File | string;
};

const UploadTemplateFrom = () => {
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const countriesData = data?.data || [];
  const countryOptions = getCountryLabel(countriesData);
  const { closeDrawer } = useDrawer();
  const [createTemplate, { isLoading, isError, error }] =
    useCreateTemplateMutation();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("country", "EU");
      formData.append("description", values.description || "");
      formData.append("type", "SMPC");
      formData.append("templateFile", values.templateFile);
      const res = await createTemplate(formData).unwrap();
      closeDrawer();
      toast.success(res.message || "Template Uploaded ");
    } catch (err: any) {
      toast.error(err?.data?.message || "Template Uploaded failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Template Uploaded failed");
    }
  }, [isError, error]);

  return (
    <div>
      <Formik<FormValues>
        initialValues={{
          country: "",
          title: "",
          type: "",
          templateFile: "",
          description: "",
        }}
        validationSchema={UploadTemplateFromSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, errors, isSubmitting, values }) => {
          const typeOptions = getDocumentOptions(countriesData, values.country);
          return (
            <div className="w-full  pt-4  ">
              <Form className="w-full flex flex-col">
                <FormikInput
                  name="title"
                  label="Template Title*"
                  placeholder="e.g. France SPC Template"
                />
                <FormikInput
                  name="description"
                  label="Template Description"
                  placeholder="e.g. France SPC Template"
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
                  <FormikAwareDocumentUploader name="templateFile" />
                </div>
                {/* Submit */}
                <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
                  <div className="w-full p-4">
                    <DynamicButton
                      icon={<LuCloudUpload size={24} />}
                      variant="submit"
                      text={isLoading ? "Uploading..." : "Upload"}
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

export default UploadTemplateFrom;
