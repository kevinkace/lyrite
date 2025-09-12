"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Song } from "@/types";

type SongsContextType = {
    songsById: Record<string, Song>;
    loading: boolean;
    getSong: (id: string) => Promise<Song | null>;
    getSongs: (ids: string[]) => Promise<Song[]>;
    querySongs: (opts: {
        userId?: string;
        username?: string;
        limit?: number;
        songIds?: string[];
    }) => Promise<Song[]>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export function SongsProvider({ children }: { children: React.ReactNode }) {
    const [songsById, setSongsById] = useState<Record<string, Song>>({});
    const [loading, setLoading] = useState(false);

    // helper to merge fetched songs into cache
    const addToCache = (songs: Song[]) => {
        setSongsById((prev) => {
            console.log("prev:", prev);

            const updated = { ...prev };

            songs.forEach((s) => {
                updated[s.id] = s;
            });

            console.log("updated:", updated);
            return updated;
        });
    };

    const getSong = async (id: string): Promise<Song | null> => {
        if (songsById[id]) return songsById[id];

        const { data, error } = await supabase
            .from("songs")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error(error);

            return null;
        }

        addToCache([data as Song]);

        return data as Song;
    };

    const getSongs = async (ids: string[]): Promise<Song[]> => {
        const missing = ids.filter((id) => !songsById[id]);

        if (missing.length > 0) {
            console.log("missing:", missing);

            const { data, error } = await supabase
                .from("songs")
                .select("*")
                .in("id", missing);

            console.log({ data, error });

            if (error) {
                console.error(error);

                return ids.map((id) => songsById[id]).filter(Boolean);
            }

            addToCache(data as Song[]);
        }

        return ids.map((id) => songsById[id]).filter(Boolean);
    };

    const querySongs = async ({
        userId,
        username,
        limit,
        songIds,
    }: {
        userId?: string;
        username?: string;
        limit?: number;
        songIds?: string[];
    }): Promise<Song[]> => {
        setLoading(true);

        let query;

        if (songIds && songIds.length > 0) {
            query = supabase
                .from("songs")
                .select("*")
                .in("id", songIds);
        } else {
            query = supabase
                .from("songs")
                .select("*")
                .order("created_at", { ascending: false });

            if (username) {
                query = query.eq("profiles.username", username).eq("is_public", true);
            } else if (userId) {
                query = query.eq("user_id", userId);
            }

            if (limit) query = query.limit(limit);
        }

        const { data, error } = await query;

        setLoading(false);

        if (error) {
            console.error(error);
            return [];
        }

        addToCache(data as Song[]);

        return data as Song[];
    };


    return (
        <SongsContext.Provider
            value={{ songsById, loading, getSong, getSongs, querySongs }}
        >
            {children}
        </SongsContext.Provider>
    );
}

export function useSongs() {
    const ctx = useContext(SongsContext);
    if (!ctx) throw new Error("useSongs must be used within SongsProvider");
    return ctx;
}

// ---------- Convenience hooks ----------

export function useSongsByIds(ids: string[] | undefined) {
    const { getSongs, loading } = useSongs();
    const [songs, setSongs] = useState<Song[] | undefined>(undefined);

    useEffect(() => {
        if (!ids || ids.length === 0) {
            return;
        }

        getSongs(ids).then(setSongs);
    }, [ids?.join(","), getSongs]);

    return { songs, loading };
}

export function useQuerySongs({ userId, username, limit }: {
    userId?: string;
    username?: string;
    limit?: number;
}) {
    const { querySongs, loading } = useSongs();
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        querySongs({ userId, username, limit }).then(setSongs);
    }, [userId, username, limit, querySongs]);

    return { songs, loading };
}
