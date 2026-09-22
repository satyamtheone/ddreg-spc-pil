"use client";
import { Formik, Form } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import SelectedDocumentDetailsChip from "./SelectedDocumentDetailsChip";
import FormikSelect from "@/components/FormikComponents/FormikSelect";
import {
  useGetCountriesQuery,
  useGetTemplatesQuery,
} from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { getCountryLabel, mapToFormikOptions } from "@/lib/utilMethods";
import { step2Schema } from "../validation/schema";
import TemplateDetailsChip from "./templateDetailsChip";
import { useEffect, useState } from "react";

export default function SelectTemplateForm({
  templateId,
}: {
  templateId: string;
}) {
  const { formData, updateData, setStep } = useStepper();
  const [templateName, setTemplateName] = useState("");
  const [regulatorybodyName, setRegulatoryBodyName] = useState("");
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const templateQuery = useGetTemplatesQuery({
    country: formData.stepReference?.countryCode,
  });
  const templatesByCountry = useQueryErrorHandler(
    templateQuery,
    "Get Templates",
  );
  const templateOptions = mapToFormikOptions(
    templatesByCountry?.data || [],
    "name",
    "id",
  );
  const countriesData = data?.data || [];
  const countryOptions = getCountryLabel(countriesData);

  useEffect(() => {
    const regulatory = countriesData.find(
      (country) => country.code === formData.stepReference?.countryCode,
    )?.regulatoryBody;
    setRegulatoryBodyName(regulatory || "");
  }, [countriesData]);

  return (
    <Formik
      initialValues={{
        countryCode: formData.stepReference?.countryCode || "",
        templateId: formData.stepTemplate?.templateId || templateId,
      }}
      validationSchema={step2Schema(templateId)}
      onSubmit={(values) => {
        updateData({
          stepTemplate: {
            templateId: values.templateId || templateId,
            templateName: templateName,
            regulatoryBody: regulatorybodyName,
          },
        });
        setStep(3);
      }}
    >
      {({ values }) => {
        const templateById = templatesByCountry?.data.find(
          (template) => template.id === values.templateId,
        );
        useEffect(() => {
          setTemplateName(templateById?.name || "");
        }, [templateById]);
        return (
          <Form
            className={`flex flex-col gap-4 ${formData.stepReference?.countryName ? "" : "pointer-events-none opacity-50"}`}
          >
            <SelectedDocumentDetailsChip
              subtitleOne={formData.stepReference?.referenceName}
              subtitleTwo={formData.stepReference?.activeIngredient}
              title="Reference Document"
            />
            <div className="flex gap-4 w-full">
              <div className="border border-gray-200 p-4 rounded-[10px] w-full">
                <FormikSelect
                  disabled
                  name="countryCode"
                  label="Select Target Country"
                  isLoading={query.isLoading}
                  options={countryOptions}
                />
                {query.isLoading ? (
                  <></>
                ) : (
                  <SelectedDocumentDetailsChip
                    subtitleOne="Regulatory Authority"
                    subtitleTwo={regulatorybodyName}
                  />
                )}
              </div>

              <div className="border border-gray-200 p-4 rounded-[10px] w-full">
                <FormikSelect
                  name="templateId"
                  label="Select Template"
                  isLoading={templateQuery.isLoading}
                  options={templateOptions}
                  onChange={(e) => {
                    const label =
                      e.target.options[e.target.selectedIndex].label;
                    setTemplateName(label);
                  }}
                />
                {templateQuery.isLoading ? (
                  <></>
                ) : (
                  <SelectedDocumentDetailsChip
                    subtitleOne="Template Version"
                    subtitleTwo={templateById?.version}
                  />
                )}
              </div>
            </div>
            {templateQuery.isLoading || templateQuery.isFetching ? (
              <div className="h-50 w-full skeleton rounded-[10px]"></div>
            ) : (
              <TemplateDetailsChip templateById={templateById} />
            )}

            <div className="w-full flex justify-between">
              <div>
                <DynamicButton
                  text="Back "
                  type="button"
                  variant="card"
                  onClick={() => setStep(1)}
                  icon={<FaArrowLeft />}
                />
              </div>
              <div>
                <DynamicButton
                  isSubmitting={!values.templateId}
                  text="Continue To Product Input"
                  type="submit"
                  variant="submit"
                  icon={<IoDocumentTextOutline size={25} />}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
