"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "error" | "confirm" | "downloadPII" | "editor" |null;

interface ModalState {
  type: ModalType;
  title: string;
  props?: Record<string, any>;
}

interface ModalContextValue {
  modal: ModalState;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (m: ModalState) => setModal(m);
  const closeModal = () => setModal({ type: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
