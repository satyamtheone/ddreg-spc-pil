"use client";
import { Formik, Form, Field } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step1Schema } from "../validation/schema";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import ReferenceContent from "./ReferenceContent";
import FormikAwareCheckBox from "@/components/FormikComponents/FormikAwareCheckBox";
import { useNavigation } from "@/components/hooks/useNavigation";
import { useGetReferenceByIdQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";

export default function SelectReferenceForm({
  referenceId,
}: {
  referenceId: string;
}) {
  const query = useGetReferenceByIdQuery(referenceId);
  const data = useQueryErrorHandler(query, "Get Reference By Id");
  const { formData, updateData, setStep } = useStepper();
  const { goTo } = useNavigation();
  return (
    <Formik
      initialValues={{
        slectedDocument: formData.stepReference?.isSlectedDocument || false,
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        updateData({
          stepReference: {
            referenceName: data?.data?.name || "",
            activeIngredient: data?.data?.activeIngredient,
            countryCode: data?.data?.type?.country?.code || "",
            slectedReferenceId: data?.data?.id || "",
            type: data?.data?.type?.name,
            isSlectedDocument: values.slectedDocument,
            countryName: data?.data?.type?.country.name || "",
            description: data?.data?.description || "",
          },
        });
        setStep(2);
      }}
    >
      {({ isValid, dirty }) => (
        <Form className="flex flex-col gap-4">
          <ReferenceContent
            data={data}
            isLoading={query.isLoading || query.isFetching}
          />
          <div
            className={`${formData.stepReference?.isSlectedDocument == true ? "border-cyan-500 bg-cyan-50 shadow-md shadow-cyan-100 " : "border-slate-300 shadow-sm"} border  p-4 rounded-[10px]`}
          >
            <div className="flex gap-4 items-center">
              <div>
                <FormikAwareCheckBox
                  name="slectedDocument"
                  onChange={(checked) =>
                    updateData({
                      stepReference: { isSlectedDocument: checked },
                    })
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
                onClick={() => goTo(`/generate-SPC-PIL`)}
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
