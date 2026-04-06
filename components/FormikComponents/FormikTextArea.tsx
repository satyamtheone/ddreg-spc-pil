"use client";
import { ErrorMessage, Field } from "formik";
import React, { forwardRef, TextareaHTMLAttributes, ReactNode } from "react";

type IconPosition = "left" | "right";

interface FormikTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  className?: string;
  iconPosition?: IconPosition;
  placeholder?: string;
  sideIcon?: ReactNode;
  containerMargin?: string;
  rows?: number;
}

const FormikTextarea = forwardRef<HTMLTextAreaElement, FormikTextareaProps>(
  (
    {
      label,
      name,
      className,
      iconPosition = "right",
      placeholder,
      sideIcon,
      containerMargin,
      rows = 6,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`relative ${containerMargin ?? "mb-6"}`}>
        {label && (
          <label className="block text-zinc-800 mb-2" htmlFor={name}>
            {label}
          </label>
        )}

        <div className="relative">
          <Field
            as="textarea"
            innerRef={ref}
            rows={rows}
            name={name}
            placeholder={placeholder}
            autoComplete="off"
            className={`flex p-2.5 w-full placeholder:text-neutral-400 placeholder:capitalize rounded-md border animate-dialog-slide-down ${
              iconPosition === "left" ? "pl-10" : "px-3"
            } py-2 border-slate-300 placeholder:text-neutral-500 focus-visible:shadow-md hover:shadow-md focus-visible:ring-cyan-600 bg-transparent text-sm shadow-sm transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ${className}`}
            {...props}
          />

          {sideIcon && (
            <div
              className={`absolute top-4 ${
                iconPosition === "left" ? "left-3" : "right-3"
              } text-black`}
            >
              {sideIcon}
            </div>
          )}
        </div>

        <ErrorMessage
          name={name}
          render={(msg: string) => (
            <small className="text-red-500 capitalize">{msg}</small>
          )}
        />
      </div>
    );
  },
);

FormikTextarea.displayName = "FormikTextarea";

export default FormikTextarea;
