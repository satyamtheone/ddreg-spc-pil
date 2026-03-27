"use client";

import { Formik, Form, Field } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step1Schema, step2Schema } from "../validation/schema";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import SelectedDocumentDetailsChip from "./SelectedDocumentDetailsChip";

export default function SelectTemplateForm() {
  const { formData, updateData, setStep } = useStepper();

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
          <SelectedDocumentDetailsChip />
          <FormikInput
            name="templateName"
            placeholder="Template Name"
            label="Template Name"
          />
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
