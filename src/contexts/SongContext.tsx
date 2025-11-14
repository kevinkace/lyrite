"use client";

import { createContext, useContext, useState } from "react";
import merge from "lodash/merge";

import { supabase } from "@/lib/supabase/client";

import { useError } from "./ErrorContext";
import { useAuth } from "./AuthContext";

import { defaultStyles } from "@/data/consts";

import { NewSong, Song, SongContextType, SongProviderProps, LyricParsed, LoadSongProps } from "@/types";


const SongContext = createContext<SongContextType | undefined>(undefined);

function parseLyrics(raw: string): LyricParsed[] {
    return raw.split(/\n{2,}/).map((section, i) => ({
        id: i,
        text: section.trim(),
        style: {},
    }));
}

export function SongProvider({ children }: SongProviderProps) {
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(false);

    const { setError } = useError();

    const { user } = useAuth();

    const loadSong = async ({ id, user_id : userId, slug }: LoadSongProps) => {
        if (!id && (!slug || !userId)) {
            console.warn("Missing identifiers for loadSong", { id, userId, slug });

            return;
        }

        setLoading(true);

        try {
            let query = supabase.from("songs").select("*");

            if (id) {
                query = query.eq("id", id);
            } else {
                query = query.eq("user_id", userId).eq("slug", slug);
            }

            const { data, error } = await query.single();

            if (error) throw error;

            // Fallbacks for dev data
            if (!data.lyrics_parsed) data.lyrics_parsed = parseLyrics(data.lyrics);
            if (!data.style) data.style = defaultStyles;

            setSong(data as Song);

            return data as Song;
        } catch (err: any) {
            setError(err.message);
            setSong(null);
        } finally {
            setLoading(false);
        }
    };

    const createSong = async ({ song }: { song: NewSong }) => {
        if (!user?.id) throw new Error("No user provided");

        const { data, error } = await supabase
            .from("songs")
            .insert({
                ...song,
                lyrics_parsed: parseLyrics(song.lyrics),
                style: defaultStyles
            })
            .select()
            .single();

        if (error) throw error;

        setSong(data as Song);

        return data as Song;
    };

    const updateSong = async (updatedSong: NewSong) => {
        if (!song) {
            throw new Error("No song to update");
        }

        const { data, error } = await supabase
            .from("songs")
            .update({
                ...updatedSong,
                lyrics_parsed: parseLyrics(updatedSong.lyrics)
            })
            .eq("id", song.id)
            .select()
            .single();

        if (error) throw error;

        setSong(data as Song);

        return data as Song;
    }

    const saveSong = async () => {
        if (!song) throw new Error("No song to save");

        const { error } = await supabase
            .from("songs")
            .update(song)
            .eq("id", song.id);

        if (error) {
            setError(error.message);
            throw error;
        }
    };

    const updateSection = (sectionId: number, newData: Partial<LyricParsed>) => {
        if (!song) return;
        const updated = song.lyrics_parsed.map(s => (s.id === sectionId ? merge(s, newData) : s));
        setSong({ ...song, lyrics_parsed: updated });
    };

    const setStyle = (newStyle: Partial<Song["style"]>) => {
        if (!song) return;
        setSong({ ...song, style: { ...song.style, ...newStyle } });
    };

    const setSectionStyle = (sectionId: number, newStyle: Partial<LyricParsed["style"]>) => {
        if (!song) return;
        const updated = song.lyrics_parsed.map(s =>
            s.id === sectionId ? { ...s, style: { ...s.style, ...newStyle } } : s
        );
        setSong({ ...song, lyrics_parsed: updated });
    };

    const resetAllColors = () => {
        if (!song) return;
        const updated = song.lyrics_parsed.map(s => ({ ...s, style: { ...s.style, color: null } }));
        setSong({ ...song, lyrics_parsed: updated });
    };

    return (
        <SongContext.Provider
            value={{
                song,
                loading,
                setLoading,
                loadSong,
                createSong,
                saveSong,
                updateSong,

                updateSection,
                setStyle,
                setSectionStyle,
                resetAllColors
            }}
        >
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    const ctx = useContext(SongContext);
    if (!ctx) throw new Error("useSong must be used within SongProvider");
    return ctx;
}
