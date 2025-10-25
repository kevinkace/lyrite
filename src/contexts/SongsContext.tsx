"use client";

import { createContext, useContext } from "react";

import { useSupabaseCollection } from "@/hooks/useSupabaseCollection";

import type { Song, SongsContextType, SongsProviderProps } from "@/types";

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export function SongsProvider(props: SongsProviderProps) {
    const {
        items: songs,
        loading,
        setLoading,
        error,
        hasMore,
        deleteItem: deleteSong,
        updateItemInState: updateSongInState,
        updateItem: updateSong,
    } = useSupabaseCollection<Song>({
        table: "songs",
        userId: props.userId,
        ids: props.ids,
        page: props.page,
        pageSize: props.pageSize,
        search: props.search,
        initialData: props.initialSongs,
    });

    return (
        <SongsContext.Provider
            value={{
                songs,
                loading,
                setLoading,
                error,
                page: props.page,
                search: props.search,
                hasMore,
                deleteSong,
                updateSongInState,
                updateSong,
            }}
        >
            {props.children}
        </SongsContext.Provider>
    );
}

export function useSongs() {
    const ctx = useContext(SongsContext);
    if (!ctx) throw new Error("useSongs must be used within SongsProvider");
    return ctx;
}
