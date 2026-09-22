"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import DrawerContainer from "../drawer/DrawerContainer";

type DrawerPosition = "left" | "right" | "top" | "bottom";



type DrawerContextType = {
  openDrawer: (options:any) => void;
  closeDrawer: () => void;
  isAnyDrawerOpen: boolean;
};

const EMPTY_FUNC = () => {};

const DrawerContext = createContext<DrawerContextType>({
  openDrawer: EMPTY_FUNC,
  closeDrawer: EMPTY_FUNC,
  isAnyDrawerOpen: false,
});

export const useDrawer = () => useContext(DrawerContext);

type DrawerProviderProps = {
  children: ReactNode;
};

const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [drawer, setDrawer] = useState<any | null>(null);

  const openDrawer = (options: any) => {
    setDrawer({
      ...options,
      position: options.position ?? "right",
    });
  };

  const closeDrawer = () => {
    setDrawer(null);
  };

  return (
    <DrawerContext.Provider
      value={{
        openDrawer,
        closeDrawer,
        isAnyDrawerOpen: !!drawer,
      }}
    >
      {children}

      {drawer && (
        <DrawerContainer
          open={true} // always true when drawer exists
          position={drawer.position}
          onClose={closeDrawer}
          title={drawer.title}
          width={drawer.width}
        >
          {drawer.children}
        </DrawerContainer>
      )}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;