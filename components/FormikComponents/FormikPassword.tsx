"use client";
import { useState } from "react";
import { MdVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import FormikInput from "./FormikInput";
import { ReactNode } from "react";
import { handleVisibility } from "@/lib/utils";

interface FormikPasswordProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const FormikPassword = ({
  name,
  label,
  placeholder = "Enter password",
}: FormikPasswordProps) => {
  const [type, setType] = useState<"password" | "text">("password");

  return (
    <FormikInput
      name={name}
      type={type}
      placeholder={placeholder}
      label={label}
      sideIcon={
        <span onClick={() => handleVisibility(type, setType)}>
          {type === "password" ? (
            <MdVisibilityOff className="text-black h-6 w-6 cursor-pointer" />
          ) : (
            <MdOutlineVisibility className="text-black h-6 w-6 cursor-pointer" />
          )}
        </span>
      }
    />
  );
};

export default FormikPassword;