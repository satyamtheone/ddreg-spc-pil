"use client";

import { Formik, Form, Field } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step1Schema } from "../validation/schema";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function GenerateTemplate() {
  const { formData, updateData, setStep } = useStepper();

  return (
    <Formik
      initialValues={{
        generateTemplate: formData.generateTemplate || "",
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        updateData(values);
      }}
    >
      {({ dirty, isValid }) => (
        <Form className="flex flex-col gap-4">
          <FormikInput
            name="generateTemplate"
            placeholder="Reference Name"
            label="Reference Name"
          />
          <div className="w-full flex justify-between ">
            <div>
              <DynamicButton
                text="Back "
                type="button"
                variant="card"
                onClick={() => setStep(3)}
                icon={<FaArrowLeft />}
              />
            </div>
            <div>
              <DynamicButton
                isSubmitting={!dirty || !isValid}
                text="Generate SPC / PIL Document"
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
