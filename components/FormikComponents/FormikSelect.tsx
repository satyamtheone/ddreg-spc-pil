"use client";
import { useField } from "formik";
import React from "react";

export type FormikOptonType = {
  label: string;
  value: string | number;
};

interface FormikSelectProps {
  label?: string;
  name: string;
  options: FormikOptonType[];
  isLoading?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
  labelText?: string;
  isGhost?: boolean;
}

const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  isLoading,
  disabled,
  onChange,
  labelText,
  isGhost,
  ...props
}) => {
  const [field, meta] = useField<string | number>(props.name);

  return (
    <div className="relative flex flex-col items-start w-full mb-6 ">
      {isLoading ? (
        <div className="w-full">
          <div className="mb-2 w-1/2 skeleton skeleton-text "> {label}</div>
          <div className="md:h-14 h-10 skeleton w-full"></div>
        </div>
      ) : (
        <>
          {label && (
            <label
              className="block text-zinc-800 mb-2 capitalize"
              htmlFor={props.name}
            >
              {label}
            </label>
          )}

          <div className="relative w-full animate-dialog-slide-down">
            <select
              {...field}
              {...props}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              id={field.name}
              disabled={disabled}
              className={`select md:select-xl border rounded-[6px] focus-visible:ring-teal-600 focus-visible:outline-none focus-visible:ring-1  focus-visible:shadow-md hover:shadow-md md:px-4 md:py-4.5 py-2 px-2 w-full shadow-sm text-sm capitalize ${isGhost ? "select-ghost bg-white/10 border-white text-white" : "border-slate-300"}`}
            >
              <option
                disabled
                value=""
                className={`${isGhost ? "text-gray-400 bg-white rounded-b-none" : ""}`}
              >
                Choose {label || labelText}
              </option>

              {options.map((d, index) => (
                <option
                  key={index}
                  value={d.value}
                  className={`text-sm hover:bg-gradient ${isGhost ? "text-black bg-white hover:bg-sky-200 rounded-t-none shadow-2xl" : ""}`}
                >
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {meta.touched && meta.error && (
            <small className="text-red-500">{meta.error}</small>
          )}
        </>
      )}
    </div>
  );
};

export default FormikSelect;