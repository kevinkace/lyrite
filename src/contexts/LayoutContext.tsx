"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LayoutContextType = {
  headerContent: ReactNode;
  setHeaderContent: (content: ReactNode) => void;

  headerUserContent: ReactNode;
  setHeaderUserContent: (content: ReactNode) => void;

  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  stopLoadingAll: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [headerContent, setHeaderContent] = useState<ReactNode>(null);
  const [headerUserContent, setHeaderUserContent] = useState<ReactNode>(null);

  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => setLoadingCount((count) => count + 1);
  const stopLoading = () => setLoadingCount((count) => Math.max(0, count - 1));
  const stopLoadingAll = () => setLoadingCount(0);

  const isLoading = loadingCount > 0;

  return (
    <LayoutContext.Provider value={{
      headerContent,
      setHeaderContent,

      headerUserContent,
      setHeaderUserContent,

      isLoading,
      startLoading,
      stopLoading,
      stopLoadingAll
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
