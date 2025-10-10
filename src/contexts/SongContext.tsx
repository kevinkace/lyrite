"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { useError } from "./ErrorContext";
import { useAuth } from "./AuthContext";

import { NewSong, Song, SongContextType, SongProviderProps, LyricParsed } from "@/types";
import { defaultStyles } from "@/data/consts";

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
                style: defaultStyles,
                user_id: user.id,
                slug,
                is_public: false,
            })
            .select()
            .single();

        if (error) throw error;

        return data as Song;
    };

    const setStyle = (newStyle: Partial<Song["style"]>) => {
        if (!song) return;

        const update = { ...song, style: { ...song.style, ...newStyle } };
        setSong(update);
    };

    const setSectionStyle = (sectionId: number, newStyle: Partial<LyricParsed["style"]>) => {
        if (!song) return;

        const updatedSections = song.lyrics_parsed.map(section => {
            if (section.id === sectionId) {
                return { ...section, style: { ...section.style, ...newStyle } };
            }
            return section;
        });

        setSong({ ...song, lyrics_parsed: updatedSections });
    };

    const resetAllColors = () => {
        if (!song) return;

        const updatedSections = song.lyrics_parsed.map(section => ({
            ...section,
            style: { ...section.style, color: null }
        }));
        setSong({ ...song, lyrics_parsed: updatedSections });
    }

    const saveSong = async () => {
        if (!song) {
            throw new Error("No song to save");
        }
        const { error } = await supabase
            .from("songs")
            .update({
                title: song.title,
                artist: song.artist,
                lyrics: song.lyrics,
                lyrics_parsed: song.lyrics_parsed,
                style: song.style,
                is_public: song.is_public,
            })
            .eq("id", song.id);

        if (error) {
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        if (!id && (!slug || !userId)) {
            console.log("missing identifiers", { id, slug, userId });
            return;
        }

        console.log("Fetching song", { id, slug, userId });

        const fetchSong = async () => {
            setLoading(true);

            let query = supabase.from("songs").select("*");

            if (id) {
                query = query.eq("id", id);
            } else if (userId && slug) {
                query = query.eq("user_id", userId).eq("slug", slug);
            }

            const { data, error } = await query.single();

            if (error) {
                setError(error.message);
                setSong(null);
            } else {

                // cleanup for feature dev, can be deleted
                if (!data.lyrics_parsed) {
                    data.lyrics_parsed = parseLyrics(data.lyrics);
                }
                if (!data.style) {
                    data.style = defaultStyles;
                }

                setSong(data as Song);
            }
            setLoading(false);
        };

        fetchSong();
    }, [id, slug, userId, setError]);

    return (
        <SongContext.Provider value={{
            song,
            loading,
            createSong,
            setStyle,
            saveSong,
            setSectionStyle,
            resetAllColors
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
