"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import DialogContainer from "../dialog/DialogContainer";

type DialogOptions = {
  id?: number;
  open?: boolean;
  [key: string]: any;
};

type DialogContextType = {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
  isAnyModalOpen: boolean;
};

const EMPTY_FUNC = () => {};

const DialogContext = createContext<DialogContextType>({
  openDialog: EMPTY_FUNC,
  closeDialog: EMPTY_FUNC,
  isAnyModalOpen: false,
});

export const useDialog = () => useContext(DialogContext);

type DialogProviderProps = {
  children: ReactNode;
};

const DialogProvider = ({ children }: DialogProviderProps) => {
  const pathname = usePathname();
  const [dialogs, setDialogs] = useState<DialogOptions[]>([]);

  const isAnyModalOpen = dialogs.length > 0;

  useEffect(() => {
    closeDialog();
  }, [pathname]);

  const openDialog = (options: DialogOptions) => {
    setDialogs((prev) => [
      ...prev.map((d) => ({ ...d, open: false })),
      { ...options, id: Date.now(), open: true },
    ]);
  };

  const closeDialog = () => {
    setDialogs([]);
  };

  const contextValue: DialogContextType = {
    openDialog,
    closeDialog,
    isAnyModalOpen,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}

      {dialogs.map((dialog) => (
        <DialogContainer key={dialog.id} {...dialog} onClose={closeDialog} />
      ))}
    </DialogContext.Provider>
  );
};

export default DialogProvider;