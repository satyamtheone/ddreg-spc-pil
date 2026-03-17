"use client";
import { Field, FieldProps } from "formik";
import React, { InputHTMLAttributes } from "react";

interface FormikToggleProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  className?: string;
}

const FormikToggle: React.FC<FormikToggleProps> = ({
  label,
  name,
  className = "",
  ...props
}) => {
  return (
    <div className="relative flex gap-2 items-center">
      {label && (
        <label className="block text-zinc-800 capitalize" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative">
        <Field name={name}>
          {({ field }: FieldProps) => (
            <input
              type="checkbox"
              id={name}
              {...field}
              {...props}
              checked={field.value} // ✅ important for checkbox binding
              className={`toggle border-cyan-100 bg-cyan-100 checked:border-sky-600 checked:bg-sky-600 checked:text-white text-neutral-300 ${className}`}
            />
          )}
        </Field>
      </div>
    </div>
  );
};

export default FormikToggle;