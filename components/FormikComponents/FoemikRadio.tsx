"use client";

import { Field, FieldProps } from "formik";
import React from "react";

interface FormikRadioProps {
  label?: string;
  name: string;
  value: string; // value of this radio
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const FormikRadio: React.FC<FormikRadioProps> = ({
  label,
  name,
  value,
  disabled,
  onChange,
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const isChecked = field.value === value;

          return (
            <div className="hover:bg-sky-50 p-2 rounded-2xl flex items-center flex-row-reverse justify-between animate-dialog-slide-down">
              <input
                type="radio"
                name={name}
                value={value}
                checked={isChecked}
                disabled={disabled}
                className="radio radio-sm bg-blue-100 border-sky-300 checked:bg-sky-200 checked:text-sky-600 checked:border-sky-600"
                onChange={() => {
                  form.setFieldValue(name, value);
                  onChange?.(value);
                }}
              />
              {label && (
                <label
                  className={`text-zinc-800 capitalize   text-sm cursor-pointer ${isChecked && "font-bold"}`}
                >
                  {label}
                </label>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default FormikRadio;
