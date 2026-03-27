"use client";
import { ErrorMessage, Field } from "formik";
import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

type IconPosition = "left" | "right";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  className?: string;
  iconPosition?: IconPosition;
  variant?: string;
  type?: string;
  placeholder?: string;
  sideIcon?: ReactNode;
  containerMargin?: string;
}

const FormikInput = forwardRef<HTMLInputElement, FormikInputProps>(
  (
    {
      label,
      name,
      className,
      iconPosition = "right",
      variant,
      type = "text",
      placeholder,
      sideIcon,
      containerMargin,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={`relative ${containerMargin ? containerMargin : "mb-6"} `}
      >
        {label && (
          <label className="block text-zinc-800 mb-2" htmlFor={name}>
            {label}
          </label>
        )}

        <div className="relative">
          <Field
            innerRef={ref}
            className={`flex md:h-14 h-10 p-2.5 w-full placeholder:text-neutral-400 placeholder:capitalize rounded-md border animate-dialog-slide-down ${
              iconPosition === "left" ? "pl-10" : "px-3"
            } py-1 border-slate-300 placeholder:text-neutral-500 focus-visible:shadow-md hover:shadow-md focus-visible:ring-cyan-600 bg-transparent text-sm shadow-sm transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ${className}`}
            placeholder={placeholder}
            type={type}
            name={name}
            autoComplete="off"
            {...props}
          />

          {sideIcon && (
            <div
              className={`absolute top-1/2 transform ${
                iconPosition === "left" ? "left-3" : "right-3"
              } -translate-y-1/2 text-black`}
            >
              {sideIcon}
            </div>
          )}
        </div>

        <div className={""}>
          <ErrorMessage
            name={name}
            render={(msg: string) => (
              <small className="text-red-500 capitalize">{msg}</small>
            )}
          />
        </div>
      </div>
    );
  },
);

FormikInput.displayName = "FormikInput";

export default FormikInput;