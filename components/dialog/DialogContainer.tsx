"use client";
import React, { ReactNode } from "react";

interface DialogContainerProps {
  children?: ReactNode;
  open?: boolean;
  [key: string]: any; // allows additional dialog params if passed
}

const DialogContainer = ({
  children,
  open,
  ...dialogParams
}: DialogContainerProps) => {
  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      {children}
    </div>
  );
};

export default DialogContainer;