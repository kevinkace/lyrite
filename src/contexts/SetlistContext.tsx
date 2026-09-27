"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import type { Setlist, Song } from "@/types";

export type SetlistWithSongs = Setlist & { songs: Song[] };

type SetlistContextType = {
    setlist: SetlistWithSongs | null;
    loading: boolean;
    error: string | null;
    loadSetlist: (id: string) => Promise<SetlistWithSongs | null>;
    addSong: (setlistId: string, songId: string) => Promise<void>;
    removeSong: (setlistId: string, songId: string) => Promise<void>;
};

const SetlistContext = createContext<SetlistContextType | undefined>(undefined);

export function SetlistProvider({ children, userId }: { children: ReactNode; userId?: string }) {
    const [setlist, setSetlist] = useState<SetlistWithSongs | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadSetlist = useCallback(async (id: string) => {
        setLoading(true);
        let query = supabase
            .from("setlists")
            .select("*, setlist_songs(position, song:songs(*))")
            .eq("id", id);

        if (userId) query = query.eq("user_id", userId);

        const { data, error: fetchError } = await query.single();

        if (fetchError || !data) {
            setError(fetchError?.message || "Setlist not found");
            setSetlist(null);
            setLoading(false);
            return null;
        }

        const songs = (data.setlist_songs || [])
            .sort((a: { position: number }, b: { position: number }) => a.position - b.position)
            .map((item: { song: Song }) => item.song);
        const loaded = { ...data, songs } as SetlistWithSongs;

        setSetlist(loaded);
        setError(null);
        setLoading(false);
        return loaded;
    }, [userId]);

    const addSong = async (setlistId: string, songId: string) => {
        const position = setlist?.songs.length || 0;
        const { error: insertError } = await supabase
            .from("setlist_songs")
            .insert({ setlist_id: setlistId, song_id: songId, position });
        if (insertError) throw insertError;
        await loadSetlist(setlistId);
    };

    const removeSong = async (setlistId: string, songId: string) => {
        const { error: deleteError } = await supabase
            .from("setlist_songs")
            .delete()
            .eq("setlist_id", setlistId)
            .eq("song_id", songId);
        if (deleteError) throw deleteError;
        await loadSetlist(setlistId);
    };

    return (
        <SetlistContext.Provider value={{ setlist, loading, error, loadSetlist, addSong, removeSong }}>
            {children}
        </SetlistContext.Provider>
    );
}

export function useSetlist() {
    const context = useContext(SetlistContext);
    if (!context) throw new Error("useSetlist must be used within SetlistProvider");
    return context;
}