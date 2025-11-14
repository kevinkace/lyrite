"use client";

import { use, useEffect } from "react";

import Layout from "@/components/layout/Layout";
import { useSong } from "@/contexts/SongContext";

export default function SongPage({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { song, loadSong } = useSong();
    const {id} = use(params);

    useEffect(() => {
        loadSong({ id: id });
    }, [id]);

    return (
        <Layout>
            {children}
        </Layout>
    );
}
