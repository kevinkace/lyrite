"use client";

import { ReactNode } from "react";

import { SongsProvider } from "@/contexts/songsContext"

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <SongsProvider>
            <>{children}</>
        </SongsProvider>
    );
}
