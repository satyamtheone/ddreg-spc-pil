"use client";
import { Formik, Form, Field } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step1Schema } from "../validation/schema";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import ReferenceContent from "./ReferenceContent";
import FormikAwareCheckBox from "@/components/FormikComponents/FormikAwareCheckBox";
import { goto } from "@/lib/navigation";

export default function SelectReferenceForm() {
  const { formData, updateData, setStep } = useStepper();

  return (
    <Formik
      initialValues={{
        slectedDocument: formData.slectedDocument || "",
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        setStep(2);
      }}
    >
      {({ isValid, dirty }) => (
        <Form className="flex flex-col gap-4">
          <ReferenceContent />
          <div
            className={`${formData.slectedDocument == true ? "border-cyan-500 bg-cyan-50 shadow-md shadow-cyan-100 " : "border-slate-300 shadow-sm"} border  p-4 rounded-[10px]`}
          >
            <div className="flex gap-4 items-center">
              <div>
                <FormikAwareCheckBox
                  name="slectedDocument"
                  onChange={(checked) =>
                    updateData({ slectedDocument: checked })
                  }
                />
              </div>
              <div className="text-zinc-800">
                <div className="text-base font-medium">
                  I confirm that this is the correct reference document
                </div>
                <div className="text-sm font-normal">
                  I have reviewed the document details and confirmed the brand
                  name, active ingredient, country, and document type are
                  accurate.
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div>
              <DynamicButton
                text="Back to Search"
                type="button"
                variant="card"
                icon={<FaArrowLeft />}
                onClick={() => goto(`/generate-SPC-PIL`)}
              />
            </div>
            <div>
              <DynamicButton
                isSubmitting={!dirty || !isValid}
                text="Continue To Template Selection"
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
