"use client";
import React, { forwardRef, ReactNode } from "react";

type Props = {
  variant?: "primary" | "danger" | "submit" | "outline" | "card";
  text?: string;
  size?: "base" | "slim";
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
      size,
      iconPosition = "left",
      type = "submit",
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantsClass = {
      primary: "bg-blue-800",
      card: "bg-white border border-slate-300 text-zinc-800 spc-primary-bg-hover ",
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
        className={`${variantsClass[variant]} transition-all hover:scale-3d hover:scale-101 active:scale-3d active:scale-98 disabled:opacity-50 disabled:pointer-events-none ${size == "slim" ? "md:py-2 py-1" : "px-4 md:py-4 py-1"}  hover:shadow-md shadow-sm rounded-lg w-full cursor-pointer ${className}`}
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