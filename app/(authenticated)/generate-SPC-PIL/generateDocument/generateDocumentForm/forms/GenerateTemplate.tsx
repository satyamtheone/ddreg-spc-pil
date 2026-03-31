"use client";
import { Formik, Form } from "formik";
import { useStepper } from "../stepper/stepperContext,";
import { step1Schema } from "../validation/schema";
import { GoChecklist } from "react-icons/go";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import ContentBoxes from "./contetntBoxes";
import MiniChip from "@/components/common/miniChip";

export default function GenerateTemplate() {
  const { formData, updateData, setStep } = useStepper();

  return (
    <Formik
      initialValues={{
        generateTemplate: formData.generateTemplate || "",
      }}
      // validationSchema={step1Schema}
      onSubmit={(values) => {
        updateData(values);
      }}
    >
      {() => (
        <Form className="flex flex-col gap-4">
          <div className="p-4 rounded-[10px] shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-50">
            <div>Reference Document</div>
            <div className="flex justify-between">
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">
                  Reference Document
                </div>
                <div>Aspirin 100mg</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">
                  Active Ingredient
                </div>
                <div>Acetylsalicylic Acid</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">Document Type</div>
                <div>
                  <MiniChip status={"SPC"} />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">Version</div>
                <div className="flex gap-2 items-center">
                  3.1 <MiniChip status={"Latest"} />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-[10px] shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-50">
            <div>Template & Region</div>
            <div className="flex justify-between">
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">Country</div>
                <div>Germany</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">Template</div>
                <div>Germany SPC Template 2026</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">Version</div>
                <div className="flex gap-2 items-center">
                  5.2 <MiniChip status={"Latest"} />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-neutral-400 ">Status</div>
                <div>
                  <MiniChip status={"Approved"} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[10px] spcBNS">
            <div className="text-xl font-medium mb-4">Product Information</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 w-full justify-evenly">
                <ContentBoxes title="Brand Name" subTitle="DDReg Plus" />
                <ContentBoxes title="Strength" subTitle="200mg" />
                <ContentBoxes title="Dosage Form" subTitle="Tablet" />
                <ContentBoxes title="Manufacturer" subTitle="DDReg Pharma" />
                <ContentBoxes title="Shelf Life" subTitle="3 Years" />
              </div>
              <div className="flex gap-4">
                <ContentBoxes
                  title="MAH Address"
                  subTitle="Units 444-451, Tower B2 4, SPAZE ITECH PARK, Sohna Rd, Sector 49, Gurugram, Haryana 122018"
                />
                <ContentBoxes
                  title="Date of first authorisation/renewal of the authorisation"
                  subTitle="21 December 2025"
                />
                <ContentBoxes
                  title="Date of first authorisation/renewal of the authorisation"
                  subTitle="25 December 2025"
                />
              </div>
            </div>
          </div>

          <div className="p-4  rounded-md shadow-md shadow-emerald-100 border-emerald-500 border flex gap-2 items-center bg-emerald-50">
            <div className="flex justify-center items-center h-14 w-14 bg-emerald-100 rounded-[10px]">
              <GoChecklist
                className="text-green-600"
                strokeWidth={1}
                size={36}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-zinc-800 ">Ready to Generate</div>
              <div className="text-zinc-800 text-sm">
                This is the current approved template for Germany
              </div>
            </div>
          </div>
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
                // isSubmitting={!dirty || !isValid}
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
