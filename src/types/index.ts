import { ReactNode } from "react";
import type { User as SupabaseUser, AuthError } from "@supabase/supabase-js";
import type { ButtonProps } from "@radix-ui/themes";

/* ---------- User ---------- */
export type User = {
    id: string;
    email: string;
    display_name?: string | null;
    created_at?: string;
    updated_at?: string;
};

/* ---------- Context Types ---------- */
export type UserContextType = {
    user: SupabaseUser | null;
    loading: boolean;
    handleSignOut: () => Promise<{ error: AuthError | null }>;
    signInWithGithub: () => Promise<{ error: AuthError | null }>;
};

export type AuthContextType = {
    user: SupabaseUser | null;
    loading: boolean;
    signInWithGithub: () => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
};

export type ErrorContextType = {
    error: string | null;
    setError: (msg: string | null) => void;
};

/* ---------- Lyrics & Styles ---------- */
export type LyricSectionStyle = {
    color?: string;
    fontSize?: number;
    bold?: boolean;
};

export type LyricParsed = {
    id: number;
    text: string;
    style: LyricSectionStyle;
};

export type SheetStyle = {
    fontFamily?: string;
    fontSize?: number;
    columns?: number;
};

/* ---------- Songs ---------- */
export type Song = {
    id: string;
    slug: string;
    title: string;
    artist: string;
    lyrics: string;
    lyrics_parsed: LyricParsed[];
    style: SheetStyle;
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
};

export type Songs = Song[];

export type SongsListProps = {
    songs: Songs;
};

/* ---------- Song Context ---------- */
export type SongContextType = {
    song: Song | null;
    loading: boolean;
    createSong: ({ song }: { song: NewSong }) => Promise<Song>;
    setColumns: (columns: number) => void;
    stepColumns: (step: number) => void;
    setFontSize: (fontSize: number) => void;
    setFontFamily: (fontFamily: string) => void;
};

export type SongProviderProps = {
    children: ReactNode;
    id?: string;
    userId?: string;
    slug?: string;
};

export type SongsContextType = {
    songs: Song[];
    loading: boolean;
    error: string | null;
    page?: number;
    search?: string;
    hasMore: boolean;
    deleteSong: (id: string) => Promise<void>;
    updateSongInState: (id: string, updates: Partial<Song>) => void;
    updateSong: (id: string, updates: Partial<Song>) => Promise<void>;
};

export type SongsProviderProps = {
    children: ReactNode;
    userId?: string;
    ids?: string[];
    page?: number;
    search?: string;
    pageSize?: number;
};

/* ---------- Pagination ---------- */
export type PaginationProps = {
    currentPage: number;
    totalPages?: number;
    hasMore?: boolean;
};

/* ---------- Radix UI ---------- */
export type RadixColor = ButtonProps["color"];
