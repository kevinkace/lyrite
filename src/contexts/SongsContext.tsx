"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import { supabase } from "@/lib/supabase/client";

import { Song, SongsContextType, SongsProviderProps } from "@/types";

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export function SongsProvider({
    children,
    userId,
    ids,
    page = 0,
    search,
    pageSize = 20,
    initialSongs = []
}: SongsProviderProps) {
    const [songs, setSongs] = useState<Song[]>(initialSongs);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        if (initialSongs.length > 0) return;

        const fetchSongs = async () => {
            if (!userId && (!ids || ids.length === 0)) {
                setSongs([]);
                return;
            }

            setLoading(true);
            setError(null);

            let query = supabase.from("songs").select("*");

            if (ids && ids.length > 0) {
                query = query.in("id", ids);
            } else if (userId) {
                query = query
                    .eq("user_id", userId)
                    .range((page - 1) * pageSize, page * pageSize - 1);

                if (search) {
                    query = query.ilike("title", `%${search}%`);
                }
            }

            const { data, error } = await query;

            if (error) {
                setError(error.message);
            } else {
                setSongs(data || []);
                setHasMore(
                    !ids && (data?.length ?? 0) === pageSize // only paginate if userId query
                );
            }

            setLoading(false);
        };

        fetchSongs();
    }, [userId, ids, page, search, pageSize, initialSongs.length]);

    const deleteSong = async (id: string) => {
        const { error } = await supabase.from("songs").delete().eq("id", id);
        if (error) {
            setError(error.message);
        } else {
            setSongs((prev) => prev.filter((song) => song.id !== id));
        }
    };

    const updateSongInState = (id: string, updates: Partial<Song>) => {
        setSongs((prev) =>
            prev.map((song) =>
                song.id === id ? { ...song, ...updates } : song
            )
        )
    };

    const updateSong = async (id: string, updates: Partial<Song>) => {
        let previous: Song | undefined;

        setSongs((prev) => {
            const next = prev.map((song) => {
                if (song.id === id) {
                    previous = song; // keep reference to rollback
                    return { ...song, ...updates }; // optimistic update
                }
                return song;
            });
            return next;
        });

        const { error } = await supabase
            .from("songs")
            .update(updates)
            .eq("id", id);

        if (error && previous) {
            // rollback to previous snapshot
            setSongs((prev) =>
                prev.map((song) => (song.id === id ? previous! : song))
            );
            setError(error.message);
        }
    };

    return (
        <SongsContext.Provider
            value={{
                songs,
                loading,
                setLoading,
                error,
                page,
                search,
                hasMore,
                deleteSong,
                updateSongInState,
                updateSong,
            }}
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
