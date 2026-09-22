"use client";
import { Formik, Form } from "formik";
import { useStepper } from "../../stepper/stepperContext,";
import { step3Schema } from "../../validation/schema";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentDetailsChip from "./documentDetailsChip";
import BasicInformationForm from "./basicInformationForm";
import { usePreviewDocumentMutation } from "@/lib/redux/slices/documentApi";
import { useEffect, useState } from "react";
import AutoPopulateSectionsForm from "./autoPopulateSectionsForm";
import { PreviewDocumentResponse } from "@/lib/redux/apiTypes";
import AutoPopulateSectionSkeleton from "@/components/common/skletons/autoPopulateSectionSkeleton";

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

  return (
    <Formik
      enableReinitialize
      initialValues={{
        sections: formData.sections || previewData?.data.sections || [],
        basicInformation: {
          brandName: formData.basicInformation?.brandName || "N/A",
          strength: formData.basicInformation?.strength || "N/A",
          dosageForm: formData.basicInformation?.dosageForm || "N/A",
          manufacturer: formData.basicInformation?.manufacturer || "N/A",
          shelfLife: formData.basicInformation?.shelfLife || "N/A",
          storagePrecautions:
            formData.basicInformation?.storagePrecautions || "N/A",
          MAHAddress: formData.basicInformation?.MAHAddress || "N/A",
          packagingDetails:
            formData.basicInformation?.packagingDetails || "N/A",
        },
      }}
      validationSchema={step3Schema}
      onSubmit={(values) => {
        updateData({
          sections: values.sections,
          basicInformation: {
            brandName: values.basicInformation.brandName,
            strength: values.basicInformation.strength,
            dosageForm: values.basicInformation.dosageForm,
            manufacturer: values.basicInformation.manufacturer,
            shelfLife: values.basicInformation.shelfLife,
            storagePrecautions: values.basicInformation.storagePrecautions,
            MAHAddress: values.basicInformation.MAHAddress,
            packagingDetails: values.basicInformation.packagingDetails,
          },
        });
        setStep(4);
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form
            className={`relative flex flex-col gap-4 ${formData.stepTemplate?.templateId ? "" : "pointer-events-none opacity-50"}`}
          >
            <DocumentDetailsChip formData={formData} />
            <BasicInformationForm />
            <div className="text-xl mt-4 font-semibold">Sections</div>
            <hr />
            {isLoading ? (
              <AutoPopulateSectionSkeleton />
            ) : (
              <AutoPopulateSectionsForm />
            )}
            <div className="sticky -bottom-2 w-full flex justify-between bg-white py-2 border-t px-4">
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
                  isSubmitting={!isValid}
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
