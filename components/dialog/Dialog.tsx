"use client";
import React, { ReactNode } from "react";
import DialogBox from "./DialogBox";

interface ModalProviderProps {
  hideCloseIcon?: boolean;
  children: ReactNode;
  [key: string]: any; // fallback for additional props
}

const ModalProvider = ({ children, ...props }: ModalProviderProps) => {
  return <DialogBox  {...props}>{children}</DialogBox>;
};

export default ModalProvider;
