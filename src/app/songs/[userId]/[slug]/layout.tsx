"use client";

import { SongProvider } from "@/contexts/songContext";

export default function SongLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { userId?: string; slug?: string };
}) {
    return (
        <SongProvider userId={params.userId} slug={params.slug}>
            {children}
        </SongProvider>
    );
}
