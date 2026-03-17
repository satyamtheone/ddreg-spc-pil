"use client";
import { useField } from "formik";
import React from "react";

type OptionType = {
  label: string;
  value: string | number;
};

interface FormikSelectProps {
  label?: string;
  name: string;
  options: OptionType[];
}

const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField<string | number>(props.name);

  return (
    <div className="relative flex flex-col gap-2 items-start w-full">
      {label && (
        <label className="block text-zinc-800 capitalize" htmlFor={props.name}>
          {label}
        </label>
      )}

      <div className="relative w-full">
        <select
          {...field}
          {...props}
          id={field.name}
          className="select md:select-xl focus-visible:shadow-md hover:shadow-md md:px-4 md:py-4.5 py-2 px-2 w-full shadow-sm text-sm capitalize focus-Style"
        >
          <option disabled value="">
            Choose {label}
          </option>

          {options.map((d, index) => (
            <option key={index} value={d.value} className="text-sm">
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {meta.touched && meta.error && (
        <small className="text-red-500">{meta.error}</small>
      )}
    </div>
  );
};

export default FormikSelect;