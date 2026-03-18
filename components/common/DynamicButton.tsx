"use client";
import React, { forwardRef, ReactNode } from "react";

type Props = {
  variant?: "primary" | "danger" | "submit" | "outline";
  text?: string;
  isSubmitting?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
};

const DynamicButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      text,
      isSubmitting,
      icon,
      iconPosition = "left",
      type = "submit",
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantsClass = {
      primary: "bg-blue-800",
      danger:
        "bg-white border border-red-500 hover:border-red-900 text-red-500 hover:bg-gradient-to-r from-red-400 to-red-500 hover:text-white",
      submit: "spc-primary-bg text-white spc-primary-bg-hover ",
      outline:
        "bg-white border border-sky-700 text-zinc-800 spc-primary-bg-hover ",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isSubmitting}
        className={`${variantsClass[variant]} disabled:opacity-50 disabled:pointer-events-none px-4 hover:shadow-md md:py-4 py-1 shadow-sm rounded-lg w-full cursor-pointer ${className}`}
        {...props}
      >
        <div
          className={`flex justify-center items-center gap-4 ${
            iconPosition === "right" ? "flex-row-reverse" : ""
          }`}
        >
          {icon}
          {text && <span>{text}</span>}
        </div>
      </button>
    );
  },
);

export default DynamicButton;