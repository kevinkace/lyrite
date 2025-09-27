import { ReactNode } from "react";

import type { User as SupabaseUser, AuthError } from "@supabase/supabase-js";

export type User = {
    id: string;
    email: string;
    display_name?: string | null;
    created_at?: string;
    updated_at?: string;
};

export type UserContextType = {
    user: SupabaseUser | null;
    loading: boolean;
    handleSignOut: () => Promise<{ error: AuthError | null }>;
    signInWithGithub: () => Promise<{ error: AuthError | null }>;
};

export type LyricParsed = {
    id: number;
    text: string;
    style : number
}

export type Song = {
    id: string;
    slug: string;
    title: string;
    artist: string;
    lyrics: string;
    lyrics_parsed: LyricParsed[];
    is_public: boolean;
    user_id: string;
    created_at: string;
    updated_at: string;
};

export type NewSong = {
    title: string;
    artist: string;
    lyrics: string;
    is_public: boolean;
    // user_id?: string;
    // slug?: string;
    // id?: string;
};

export type Songs = Song[];

export type SongsListProps = {
  songs: Songs;
};

export type ErrorContextType = {
    error: string | null;
    setError: (msg: string | null) => void;
};

export type AuthContextType = {
  user: SupabaseUser | null;
  loading: boolean;
  signInWithGithub: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
};

export type SongsProviderProps = {
    children: ReactNode;
    userId?: string;
    ids?: string[];
    page?: number;
    search?: string;
    pageSize?: number;
}

export type SongContextType = {
    song: Song | null;
    loading: boolean;
    handleSave: ({ song }: { song: NewSong }) => Promise<Song>;
};

export type SongProviderProps = {
    children: React.ReactNode;
    id: string;
    userId?: string;
    slug?: string;
};

export type SongsContextType = {
    songs: Song[];
    loading: boolean;
    error: string | null;
    page: number | undefined;
    search: string | undefined;
    hasMore: boolean;
    deleteSong: (id: string) => Promise<void>;
    updateSongInState: (id: string, updates: Partial<Song>) => void;
    updateSong: (id: string, updates: Partial<Song>) => Promise<void>;
};


export type PaginationProps = {
    currentPage: number;
    totalPages?: number;
    hasMore?: boolean;
};