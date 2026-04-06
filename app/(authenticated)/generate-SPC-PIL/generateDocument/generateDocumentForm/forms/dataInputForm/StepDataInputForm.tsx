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
import { useEffect, useState } from "react";
import AutoPopulateSectionsForm from "./autoPopulateSectionsForm";
import { PreviewDocumentResponse } from "@/lib/redux/apiTypes";

export default function StepDataInputForm() {
  const { formData, updateData, setStep } = useStepper();

  const [previewDocument, { isLoading, isSuccess, isError }] =
    usePreviewDocumentMutation();

  const [previewData, setPreviewData] = useState<PreviewDocumentResponse>();

  const getPreviewDocument = async () => {
    try {
      const response = await previewDocument({
        referenceId: formData.stepReference?.slectedReferenceId,
        productName: formData.stepReference?.referenceName,
        templateId: formData.stepTemplate?.templateId,
      }).unwrap();

      setPreviewData(response);
    } catch (error) {
      console.error("Preview fetch error:", error);
    }
  };

  useEffect(() => {
    if (
      formData.stepReference?.slectedReferenceId &&
      formData.stepTemplate?.templateId
    ) {
      getPreviewDocument();
    }
  }, [formData.stepReference, formData.stepTemplate]);

  if (isLoading || (!previewData && !formData.fillData)) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        Loading document preview...
      </div>
    );
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        sections:
          formData.fillData?.clinicalInformation.sections ||
          previewData?.data.sections ||
          [],
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        updateData({
          fillData: {
            clinicalInformation: {
              sections: values.sections,
            },
            basicInformation: {
              brandName: "",
              strength: "",
              dosageForm: "",
              manufacturer: "",
              shelfLife: "",
              storagePrecautions: "",
              MAHAddress: "",
              packagingDetails: "",
            },
          },
        });

        setStep(4);
      }}
    >
      {({ dirty, isValid, values }) => {
        console.log(values.sections);
        return (
          <Form className="flex flex-col gap-4">
            <DocumentDetailsChip formData={formData} />
            <BasicInformationForm />
            <AutoPopulateSectionsForm />
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
        );
      }}
    </Formik>
  );
}
