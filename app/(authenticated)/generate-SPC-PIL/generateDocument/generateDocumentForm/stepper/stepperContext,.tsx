"use client";

import { loadForm, saveForm, StepFormData } from "@/lib/storage";
import React, { createContext, useContext, useState, useEffect } from "react";

interface StepperContextType {
  step: number;
  setStep: (step: number) => void;
  formData: StepFormData;
  updateData: (data: Partial<StepFormData>) => void;
}

const StepperContext = createContext<StepperContextType | null>(null);

export const StepperProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StepFormData>({});

  useEffect(() => {
    const saved = loadForm();
    if (saved) {
      setFormData(saved.formData);
      setStep(saved.step);
    }
  }, []);

  const updateData = (data: Partial<StepFormData>) => {
    const updated = { ...formData, ...data };
    setFormData(updated);

    saveForm({
      formData: updated,
      step,
    });
  };

  useEffect(() => {
    saveForm({
      formData,
      step,
    });
  }, [step]);

  return (
    <StepperContext.Provider value={{ step, setStep, formData, updateData }}>
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) throw new Error("Stepper must be used inside provider");
  return context;
};
