"use client";

import { use } from "react";

import { SongProvider } from "@/contexts/songContext";

export default function SongLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userId?: string; slug?: string }>;
}) {
    const { userId, slug } = use(params);

    return (
        <SongProvider userId={userId} slug={slug}>
            {children}
        </SongProvider>
    );
}
