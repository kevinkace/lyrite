// context/SongsContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Song } from "@/types";

type SongsContextType = {
    songs: Song[];
    loading: boolean;
    fetchSongs: () => Promise<void>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

type SongsProviderProps = {
    children: React.ReactNode;
    username?: string; // filter by user
    limit?: number;    // limit results
};

export function SongsProvider({ children, username, limit }: SongsProviderProps) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSongs = async () => {
        setLoading(true);

        let query = supabase
            .from("songs")
            .select("*")
            .eq("is_public", true)
            .order("created_at", { ascending: false });

        if (username) query = query.eq("username", username);
        if (limit) query = query.limit(limit);

        const { data, error } = await query;

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        setSongs(data as Song[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchSongs();
    }, [username, limit]);

    return (
        <SongsContext.Provider value={{ songs, loading, fetchSongs }}>
            {children}
        </SongsContext.Provider>
    );
}

export function useSongs() {
    const ctx = useContext(SongsContext);
    if (!ctx) throw new Error("useSongs must be used within SongsProvider");
    return ctx;
}
