"use client";

import { use, useEffect } from "react";

import Layout from "@/components/layout/Layout";
import { SetlistProvider, useSetlist } from "@/contexts/SetlistContext";
import { useAuth } from "@/contexts/AuthContext";

function SetlistLayoutContent({ children, id }: { children: React.ReactNode; id: string }) {
    const { loadSetlist } = useSetlist();

    useEffect(() => {
        void loadSetlist(id);
    }, [id, loadSetlist]);

    return (
        <Layout>
            {children}
        </Layout>
    );
}

export default function SetlistPageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();

    return (
        <SetlistProvider userId={user?.id}>
            <SetlistLayoutContent id={id}>{children}</SetlistLayoutContent>
        </SetlistProvider>
    );
}
