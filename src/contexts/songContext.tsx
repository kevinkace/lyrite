"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { useError } from "./ErrorContext";
import { useAuth } from "./AuthContext";

import { NewSong, Song, SongContextType, SongProviderProps, LyricParsed } from "@/types";

const SongContext = createContext<SongContextType | undefined>(undefined);

function parseLyrics(raw: string) : LyricParsed[] {
    return raw
        .split(/\n{2,}/)
        .map((section, i) => ({
            id: i,
            text: section.trim(),
            style: {}
        }));
}

export function SongProvider({ children, id, userId, slug }: SongProviderProps) {
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(true);
    const { setError } = useError();
    const { user } = useAuth();

    const createSong = async ({ song }: { song: NewSong }) => {
        if (!user?.id) {
            throw new Error("No user provided");
        }

        const slug = song.title.toLowerCase().replace(/\s+/g, "-");

        const { data, error } = await supabase
            .from("songs")
            .insert({
                title: song.title,
                artist: song.artist,
                lyrics: song.lyrics,
                lyrics_parsed: parseLyrics(song.lyrics),
                style: {},
                user_id: user.id,
                slug,
                is_public: false,
            })
            .select()
            .single();

        if (error) throw error;

        return data as Song;
    };

    useEffect(() => {
        if (!id && (!slug || !userId)) {
            console.log("missing identifiers", { id, slug, userId });
            return;
        }

        console.log("Fetching song", { id, slug, userId });

        const fetchSong = async () => {
            setLoading(true);

            let query = supabase.from("songs").select("*").single();

            if (id) {
                query = query.eq("id", id);
            } else if (userId && slug) {
                query = query.eq("user_id", userId).eq("slug", slug);
            }

            const { data, error } = await query;

            if (error) {
                setError(error.message);
                setSong(null);
            } else {
                if (!data.lyrics_parsed) {
                    data.lyrics_parsed = parseLyrics(data.lyrics);
                }

                setSong(data as Song);
            }
            setLoading(false);
        };

        fetchSong();
    }, [id, slug, userId, setError]);

    return (
        <SongContext.Provider value={{ song, loading, createSong }}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    const ctx = useContext(SongContext);
    if (!ctx) throw new Error("useSong must be used within SongProvider");
    return ctx;
}
