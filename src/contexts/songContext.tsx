"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { useError } from "./errorContext";

import { Song } from "@/types";
import type { User as SupabaseUser } from '@supabase/auth-js';

type SongContextType = {
    song: Song | null;
    loading: boolean;
    handleSave: ({ user, song }: { user: SupabaseUser | null; song: Song }) => Promise<Song>;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

type SongProviderProps = {
    children: React.ReactNode;
    userId?: string;
    slug?: string;
};

export function SongProvider({ children, userId, slug }: SongProviderProps) {
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(true);
    const { setError } = useError();

    const handleSave = async ({
        user,
        song
    }: {
        user: SupabaseUser | null;
        song: Song;
    }) => {
        if (!user) {
            throw new Error("No user provided");
        }

        const slug = song.title.toLowerCase().replace(/\s+/g, "-"); // simple slug
        const { data, error } = await supabase
            .from("songs")
            .insert({
                title: song.title,
                artist: song.artist,
                lyrics: song.lyrics,
                user_id: user.id,
                slug,
                is_public: false,
                allow_in_setlists: false,
            })
            .select()
            .single();

        if (error) throw error;

        return data as Song;
    };

    useEffect(() => {
        if (!slug || !userId) {
            console.log("missing slug or userId", { slug, userId });
            return;
        }

        console.log("fetching song", { slug, userId });

        const fetchSong = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("songs")
                .select("*")
                // .eq("is_public", true)
                .eq("user_id", userId)
                .eq("slug", slug)
                .single();

            console.log(data);

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            setSong(data as Song);
            setLoading(false);
        };

        fetchSong();
    }, [slug, userId, setError]);

    return (
        <SongContext.Provider value={{
            song,
            loading,
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
