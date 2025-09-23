"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";

import { Song } from "@/types";

type SongsContextType = {
    songs: Song[];
    loading: boolean;
    error: string | null;
    page: number | undefined;
    search: string | undefined;
    hasMore: boolean;
    deleteSong: (id: string) => Promise<void>;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export function SongsProvider({
    children,
    userId,
    ids,
    page,
    search,
    pageSize = 20,
}: {
    children: ReactNode;
    userId?: string;
    ids?: string[];
    page?: number;
    search?: string;
    pageSize?: number;
}) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
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
    }, [userId, ids, page, search, pageSize]);

    const deleteSong = async (id: string) => {
        const { error } = await supabase.from("songs").delete().eq("id", id);
        if (error) {
            setError(error.message);
        } else {
            setSongs((prev) => prev.filter((song) => song.id !== id));
        }
    };

    return (
        <SongsContext.Provider
            value={{
                songs,
                loading,
                error,
                page,
                search,
                hasMore,
                deleteSong,
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
