"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LayoutContextType = {
  headerContent: ReactNode;
  setHeaderContent: (content: ReactNode) => void;

  headerUserContent: ReactNode;
  setHeaderUserContent: (content: ReactNode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);
  const [headerUserContent, setHeaderUserContent] = useState<ReactNode>(null);

  return (
    <LayoutContext.Provider value={{
      headerContent,
      setHeaderContent,

      headerUserContent,
      setHeaderUserContent,
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
