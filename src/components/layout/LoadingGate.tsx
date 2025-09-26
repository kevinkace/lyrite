// components/LoadingGate.tsx
"use client";

import { useEffect } from "react";

export default function LoadingGate({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);


  return <>{children}</>;
}
