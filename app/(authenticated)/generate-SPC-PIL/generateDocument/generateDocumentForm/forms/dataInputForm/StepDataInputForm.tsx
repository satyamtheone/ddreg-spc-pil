"use client";
import { Formik, Form } from "formik";
import { useStepper } from "../../stepper/stepperContext,";
import { step1Schema } from "../../validation/schema";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentDetailsChip from "./documentDetailsChip";
import BasicInformationForm from "./basicInformationForm";
import { usePreviewDocumentMutation } from "@/lib/redux/slices/documentApi";
import { useEffect } from "react";

export default function StepDataInputForm() {
  const { formData, updateData, setStep } = useStepper();

  const [previewDocument, { isLoading, isSuccess, isError, data }] =
    usePreviewDocumentMutation();

  const getPreviewDocument = async () => {
    const response = await previewDocument({
      referenceId: formData.stepReference?.slectedReferenceId,
      productName: formData.stepReference?.referenceName,
      templateId: formData.stepTemplate?.templateId,
    });
    return response.data;
  };

  useEffect(() => {
    const res = getPreviewDocument();

    console.log(res);
  }, [formData.stepReference, formData.stepTemplate]);

  return (
    <Formik
      initialValues={{
        fillData: formData.fillData || "",
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        updateData({});
        setStep(4);
      }}
    >
      {({ dirty, isValid }) => (
        <Form className="flex flex-col gap-4">
          <DocumentDetailsChip formData={formData} />
          <BasicInformationForm />
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
