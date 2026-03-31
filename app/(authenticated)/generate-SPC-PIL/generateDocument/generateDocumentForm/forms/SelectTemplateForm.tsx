"use client";

import { Formik, Form, Field } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step2Schema } from "../validation/schema";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import SelectedDocumentDetailsChip from "./SelectedDocumentDetailsChip";
import FormikSelect from "@/components/FormikComponents/FormikSelect";
import { useGetCountriesQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { getCountryLabel } from "@/lib/utilMethods";
import { MdInfoOutline } from "react-icons/md";

export default function SelectTemplateForm() {
  const { formData, updateData, setStep } = useStepper();
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const countriesData = data?.data || [];
  const countryOptions = getCountryLabel(countriesData);
  return (
    <Formik
      initialValues={{
        templateName: formData.templateName || "",
      }}
      validationSchema={step2Schema}
      onSubmit={(values) => {
        updateData(values);
        setStep(3);
      }}
    >
      {({ isValid, dirty }) => (
        <Form className="flex flex-col gap-4">
          <SelectedDocumentDetailsChip
            subtitleOne="Aspirin 100mg"
            subtitleTwo="Acetylsalicylic Acid"
            title="Reference Document"
          />
          <div className="flex gap-4 items-center w-full">
            <div className="border border-gray-200 p-4 rounded-[10px] w-full">
              <FormikSelect
                name="country"
                label="Select Target Country"
                isLoading={query.isLoading}
                options={countryOptions}
              />
              <SelectedDocumentDetailsChip
                subtitleOne="Regulatory Authority"
                subtitleTwo="BfArM (Federal Institute for Drugs and Medical Devices)"
              />
            </div>

            <div className="border border-gray-200 p-4 rounded-[10px] w-full">
              <FormikSelect
                name="country"
                label="Select Template"
                isLoading={query.isLoading}
                options={countryOptions}
              />
              <SelectedDocumentDetailsChip
                subtitleOne="Regulatory Authority"
                subtitleTwo="BfArM (Federal Institute for Drugs and Medical Devices)"
              />
            </div>
          </div>

          <div className="p-4 rounded-[10px] shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-50">
            <div>Template Details</div>
            <div className="text-sm text-neutral-400 ">Template Name</div>
            <div>Germany SPC Template 2025</div>
            <div className="p-4  rounded-[10px] shadow-md shadow-emerald-100 border-emerald-500 border flex gap-2 items-center bg-emerald-50">
              <div className="flex justify-center items-center h-10 w-10 bg-emerald-100 rounded-[10px]">
                <MdInfoOutline className="text-green-600" size={24} />
              </div>
              <div className="text-zinc-800 text-sm">
                This is the current approved template for Germany
              </div>
            </div>
          </div>

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
                isSubmitting={!dirty || !isValid}
                text="Continue To Product Input"
                type="submit"
                variant="submit"
                icon={<IoDocumentTextOutline size={25} />}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
