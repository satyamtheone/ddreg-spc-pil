"use client";

import { Formik, Form, Field } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step1Schema } from "../validation/schema";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function StepDataInput() {
  const { formData, updateData, setStep } = useStepper();

  return (
    <Formik
      initialValues={{
        fillData: formData.fillData || "",
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        updateData(values);
        setStep(4);
      }}
    >
      {({ dirty, isValid }) => (
        <Form className="flex flex-col gap-4">
          <FormikInput
            name="fillData"
            placeholder="Reference Name"
            label="Reference Name"
          />
          <div className="w-full flex justify-between">
            <div>
              <DynamicButton
                text="Back "
                type="button"
                variant="card"
                onClick={() => setStep(2)}
                icon={<FaArrowLeft />}
              />
            </div>
            <div>
              <DynamicButton
                isSubmitting={!dirty || !isValid}
                text="Continue To Summary"
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
