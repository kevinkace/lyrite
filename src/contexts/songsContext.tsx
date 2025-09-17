"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";

type Song = {
    id: string;
    title: string;
    artist: string;
    // add fields you need
};

type SongsContextType = {
    songs: Song[];
    loading: boolean;
    error: string | null;
    page: number;
    search: string;
    hasMore: boolean;
};

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export function SongsProvider({
    children,
    userId,
    page,
    search,
    pageSize = 20,
}: {
    children: ReactNode;
    userId: string;
    page: number;
    search: string;
    pageSize?: number;
}) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            setError(null);

            let query = supabase
                .from("songs")
                .select("*")
                .eq("user_id", userId)
                .range((page - 1) * pageSize, page * pageSize - 1);

            if (search) {
                query = query.ilike("title", `%${search}%`);
            }

            const { data, error } = await query;

            if (error) {
                setError(error.message);
            } else {
                setSongs(data || []);
                setHasMore((data?.length ?? 0) === pageSize);
            }

            setLoading(false);
        };

        fetchSongs();
    }, [userId, page, search, pageSize]);

    return (
        <SongsContext.Provider
            value={{
                songs,
                loading,
                error,
                page,
                search,
                hasMore,
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
