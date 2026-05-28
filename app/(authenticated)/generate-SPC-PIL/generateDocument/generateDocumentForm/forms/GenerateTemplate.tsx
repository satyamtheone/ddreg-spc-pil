"use client";
import { Formik, Form } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CreateDocumentRequest } from "@/lib/redux/apiTypes";
import toast from "react-hot-toast";
import { useNavigation } from "@/components/hooks/useNavigation";
import GenerateDocumentStepDetails from "./generateDocumentStepDetails";
import { useDialog } from "@/components/hooks/DialogProvider";
import ModalProvider from "@/components/dialog/Dialog";
import LoadingComponent from "@/components/common/loadingComponent";
import { useCreateDocumentMutation } from "@/lib/redux/slices/documentApi";

export default function GenerateTemplate() {
  const { formData, setStep } = useStepper();
  const { goTo } = useNavigation();
  const { openDialog, closeDialog } = useDialog();
  const [createDocument, { isLoading }] = useCreateDocumentMutation();

  const handleSubmit = async () => {
    const payload: CreateDocumentRequest = {
      title: formData.stepReference?.referenceName ?? "",
      templateId: formData.stepTemplate?.templateId ?? "",
      referenceId: formData.stepReference?.slectedReferenceId ?? "",
      description: formData.stepReference?.description ?? "",
      strength: formData.basicInformation?.strength ?? "",
      dosageForm: formData.basicInformation?.dosageForm ?? "",
      manufacturer: formData.basicInformation?.manufacturer ?? "",
      shelfLife: formData.basicInformation?.shelfLife ?? "",
      storagePrecautions: formData.basicInformation?.storagePrecautions ?? "",
      mahAddress: formData.basicInformation?.MAHAddress ?? "",
      packagingDetails: formData.basicInformation?.packagingDetails ?? "",
      country: formData.stepReference?.countryCode ?? "",
      regulatoryBody: formData.stepTemplate?.regulatoryBody ?? "",
      sections: formData.sections ?? [],
    };
    openDialog({
      children: (
        <ModalProvider
          size="w-200"
          title="Generating Document..."
          hideCloseIcon
        >
          <LoadingComponent />
        </ModalProvider>
      ),
    });
    try {
      const response = await createDocument(payload).unwrap();
      if (response?.success) {
        sessionStorage.setItem("generatedDocument", JSON.stringify(response));
        toast.success("Document created successfully");
        goTo("/document-repository/previewDocument");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Document creation failed");
    } finally {
      closeDialog();
    }
  };
  return (
    <Formik
      initialValues={{
        generateTemplate: formData.generateTemplate || "",
      }}
      onSubmit={(values) => {
        handleSubmit();
      }}
    >
      {() => (
        <Form
          className={`flex flex-col gap-4 ${formData.basicInformation ? "" : "pointer-events-none opacity-50"}`}
        >
          <GenerateDocumentStepDetails formData={formData} />
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
                isSubmitting={!formData.basicInformation || isLoading}
                text={`${isLoading ? "Generating..." : "Generate SPC / PIL Document"}`}
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
