"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import type { ErrorContextType } from "@/types";

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<string | null>(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
}

export function useError() {
    const ctx = useContext(ErrorContext);
    if (!ctx) throw new Error("useError must be used inside ErrorProvider");
    return ctx;
}
