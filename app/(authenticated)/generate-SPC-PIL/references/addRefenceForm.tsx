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
import { ReferencesFromWeb } from "@/lib/redux/apiTypes";
import { useNavigation } from "@/components/hooks/useNavigation";
import { InfoIcon } from "lucide-react";

type FormValues = {
  title: string;
  country: string;
  type: string;
  description?: string;
  referenceFile: File | string;
  activeingredient?: string;
};

const AddRefenceForm = ({
  reference,
  formType,
  url,
}: {
  reference?: ReferencesFromWeb;
  formType?: "web";
  url?: string;
}) => {
  const { goTo } = useNavigation();
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
      formData.append("country", values.country);
      formData.append("activeIngredient", values?.activeingredient || "");
      formData.append("type", values.type);
      if (values.description) {
        formData.append("description", values.description);
      }
      if (formType === "web") {
        formData.append("documentURL", encodeURI(url || ""));
      } else {
        if (values.referenceFile) {
          formData.append("referenceFile", values.referenceFile);
        }
      }
      const res = await createReference(formData).unwrap();
      if (res.success) {
        localStorage.setItem(
          "multi-step-form",
          JSON.stringify({ formData: {}, step: 1 }),
        );
        goTo(
          `/generate-SPC-PIL/generateDocument?referenceId=${res.data.id}&type=${values.type}`,
        );
        toast.success(res.message || "Reference Uploaded");
        closeDrawer();
      } else {
        toast.error(res.message || "Reference Upload failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Reference Upload failed");
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
          country: reference?.region || "",
          title: reference?.name || "",
          activeingredient: reference?.activeSubstance || "",
          type: "",
          referenceFile: reference?.documents[0].url || "",
          description: "",
        }}
        validationSchema={AddRefenceFormSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, errors, isSubmitting, values }) => {
          const typeOptions = getDocumentOptions(countriesData, values.country);
          return (
            <div className="w-full  pt-4 pb-20  ">
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
                <FormikInput
                  name="activeingredient"
                  label="Active Ingredient"
                  placeholder="Active Ingredient"
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
                {formType === "web" ? (
                  <div className="flex mt-6 items-center gap-3 border border-green-600 p-4 rounded-lg shadow-md bg-green-600/10 text-black">
                    <div className="p-2 bg-green-300 rounded-[10px]">
                      <InfoIcon className="text-emerald-700" />
                    </div>
                    <div>{url}</div>
                  </div>
                ) : (
                  <div className="pt-4">
                    <FormikAwareDocumentUploader name="referenceFile" />
                  </div>
                )}
                {/* Submit */}
                <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
                  <div className="w-full p-4">
                    <DynamicButton
                      icon={<LuCloudUpload size={24} />}
                      variant="submit"
                      text={
                        formType === "web"
                          ? isLoading
                            ? "Getting data From the Document..."
                            : "Get data from this Document"
                          : isLoading
                            ? "Adding Reference..."
                            : "Add Reference"
                      }
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
