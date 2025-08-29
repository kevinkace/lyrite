"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { useError } from "./errorContext";

import { Song, User } from "@/types";

type SongContextType = {
    song: Song | null;
    loading: boolean;
    handleFork: ({ user }: { user: User | null }) => Promise<void>;
    handleSave: ({ user }: { user: User | null }) => Promise<void>;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

type SongProviderProps = {
    children: React.ReactNode;
    slug?: string;
};

export function SongProvider({ children, slug }: SongProviderProps) {
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(true);
    const { setError } = useError();

    const handleFork = async ({ user }: { user: User | null }) => {
        if (!song || !user) return;

        await supabase.from("songs").insert({
            title: song.title,
            artist: song.artist,
            lyrics: song.lyrics,
            owner_id: user.id,
            is_public: false,
            allow_in_setlists: false,
        });

        alert("Forked!");
    };

    const handleSave = async ({ user }: { user: User | null }) => {
        if (!song || !user) return;

        await supabase.from("songs").insert({
            title: song.title,
            artist: song.artist,
            lyrics: song.lyrics,
            owner_id: user.id,
            is_public: false,
            allow_in_setlists: false,
        });

        alert("new!");
    };

    useEffect(() => {
        if (!slug) {
            setSong(null);
            setLoading(false);
            return;
        }

        const fetchSong = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("songs")
                .select("*")
                .eq("is_public", true)
                .eq("slug", slug)
                .single();

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            setSong(data as Song);
            setLoading(false);
        };

        fetchSong();
    }, [slug, setError]);


    return (
        <SongContext.Provider value={{
            song,
            loading,
            handleFork,
            handleSave
        }}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    const ctx = useContext(SongContext);
    if (!ctx) throw new Error("useSong must be used within SongProvider");
    return ctx;
}
