"use client";

import { Check } from "lucide-react";
import { useStepper } from "./stepperContext,";

const steps = [
  "Select Reference",
  "Select Template",
  "Fill Data Input",
  "Generate Template",
];

export default function Stepper() {
  const { step, setStep } = useStepper();


  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((label, index) => {
        const stepNumber = index + 1;

        return (
          <div
            key={index}
            onClick={() => setStep(stepNumber)}
            className=" relative flex flex-col items-center  gap-4"
          >
            <div className="flex items-center  w-full">
              <div
                className={`w-10 h-10 transition-all flex items-center justify-center rounded-full cursor-pointer hover:scale-3d hover:scale-105 active:scale-3d active:scale-95 
      
              ${step === stepNumber ? "border-teal-600 border-2" : `${step >= stepNumber ? "bg-gradient  text-white" : "border-gray-300 border-2 "}`} `}
              >
                {step >= stepNumber + 1 ? (
                  <Check className="animate-dialog-slide-down" />
                ) : (
                  <div
                    className={`h-4 w-4  rounded-full animate-fadeIn ${step >= stepNumber ? "bg-gradient" : "bg-gray-300"}`}
                  ></div>
                )}
              </div>
              {steps.length === stepNumber ? null : (
                <div
                  className={`w-24 transition-all ${step >= stepNumber ? "bg-gradient" : "bg-gray-300"} h-1`}
                ></div>
              )}
            </div>

            <span
              className={`text-sm absolute text-nowrap  -bottom-8 -left-8 ${step >= stepNumber && "text-gradient"} ${step == stepNumber ? "font-bold text-base " : "font-medium"} `}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
