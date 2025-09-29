"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { useError } from "./ErrorContext";
import { useAuth } from "./AuthContext";

import { NewSong, Song, SongContextType, SongProviderProps, LyricParsed } from "@/types";
import { columnDefault, columnsOptions, defaultStyles, fontFamilies, fontSizeDefault, fontSizes } from "@/data/consts";
import { getfontFamilyCSS } from "@/lib/fonts";

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

    const setColumns = (columns: number) => {
        if (!song) return;

        const update = { ...song, style: { ...song.style, columns } };
        setSong(update);
    };

    const stepColumns = (step: number) => {
        if (!song) return;

        const minColumns = columnsOptions[0];
        const maxColumns = columnsOptions[columnsOptions.length - 1];

        let columns = song.style?.columns || columnDefault;

        columns += step;

        if (columns < minColumns) columns = minColumns;
        if (columns > maxColumns) columns = maxColumns;

        setColumns(columns);
    };

    const setFontSize = (fontSize: number) => {
        if (!song) return;
        const update = { ...song, style: { ...song.style, fontSize } };
        setSong(update);
    };

    const stepFontSize = (step: number) => {
        if (!song) return;

        const currFontSizeIdx = fontSizes.findIndex(size => size === song.style?.fontSize);
        let newFontSizeIdx = currFontSizeIdx + step;

        if (newFontSizeIdx < 0) newFontSizeIdx = 0;
        if (newFontSizeIdx >= fontSizes.length) newFontSizeIdx = fontSizes.length - 1;

        const fontSize = fontSizes[newFontSizeIdx];

        setFontSize(fontSize);
    };

    const setFontFamily = (fontFamilyName: string) => {
        if (!song) return;

        const update = { ...song, style: { ...song.style, fontFamily: getfontFamilyCSS(fontFamilyName) } };

        setSong(update);
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
            setColumns,
            setFontSize,
            stepFontSize,
            setFontFamily,
            stepColumns
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
