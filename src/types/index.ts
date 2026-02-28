import { ReactNode } from "react";
import type { ButtonProps } from "@radix-ui/themes";

import type { User as SupabaseUser, AuthError } from "@supabase/supabase-js";

export type Profile = {
    id: string;
    updated_at: string;
    created_at: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    website?: string;
}

/* ---------- Context Types ---------- */
export type UserContextType = {
    id: string | null;
    profile: Profile | null;

    loading: boolean;
};

export type UsersContextType = {
    users: Profile[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    page?: number;
    search?: string;
    hasMore: boolean;
    pages: number;
    total: number;
    deleteUser: (id: string) => Promise<void>;
};

export type UsersProviderProps = {
    children: ReactNode;
    page?: number;
    search?: string;
    pageSize?: number;
    initialUsers?: Profile[];
}

export type AuthContextType = {
    user: SupabaseUser | null;
    profile: Profile | null;
    loading: boolean;
    signInWithProvider: (provider: 'github' | 'google' | 'facebook' | 'azure') => Promise<{ error: AuthError | null }>;
    signInWithEmail: (email: string) => Promise<{ error: AuthError | null; data?: any }>;
    signOut: () => Promise<{ error: AuthError | null }>;
    deleteAccount: () => Promise<{ error: AuthError | null }>;
    downloadPii: () => Promise<void>;
};

export type ErrorContextType = {
    error: string | null;
    setError: (msg: string | null) => void;
};

/* ---------- Lyrics & Styles ---------- */
export type LyricSectionStyle = {
    color?: number | null;
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

export type NewSong = Pick<Song, "title" | "artist" | "lyrics" | "is_public">;

export type LoadSongProps = Partial<Pick<Song, "id" | "user_id" | "slug">>;

export type SongsListProps = {
    songs: Song[];
};

/* ---------- Song Context ---------- */
export type SongContextType = {
    song: Song | null;

    loading: boolean;
    setLoading: (loading: boolean) => void;
    dirty: boolean;

    createSong: ({ song }: { song: NewSong }) => Promise<Song>;
    updateSection: (sectionId: number, newData: Partial<LyricParsed>) => void;
    loadSong: ({ id, user_id, slug }: LoadSongProps) => Promise<Song | undefined>;
    updateSong: (updatedSong: NewSong) => Promise<Song>;

    setStyle: (newStyle: Partial<Song["style"]>) => void;
    setSectionStyle: (sectionId: number, newStyle: Partial<LyricParsed["style"]>) => void;
    resetAllColors: () => void;

    saveSong: () => Promise<void>;
};

export type SongsContextType = {
    songs: Song[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    page?: number;
    search?: string;
    hasMore: boolean;
    pages: number;
    total: number;
    deleteSong: (id: string) => Promise<void>;
    updateSongInState: (id: string, updates: Partial<Song>) => void;
    updateSong: (id: string, updates: Partial<Song>) => Promise<void>;
};

/* ---------- Supabase Collection Types ---------- */

// Base collection interface with common properties
type BaseSupabaseCollection = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    hasMore: boolean;
    pages: number;
    total: number;
    page?: number;
    search?: string;
};

// Generic collection type that can work with any item type
export type SupabaseCollection<T extends { id: string } = Song | Profile> = BaseSupabaseCollection & {
    items?: T[];
};

// Users-specific collection type
export type UsersCollection = BaseSupabaseCollection &
    Pick<UsersContextType, 'users' | 'deleteUser'>;

// Songs-specific collection type
export type SongsCollection = BaseSupabaseCollection &
    Pick<SongsContextType, 'songs' | 'deleteSong' | 'updateSong' | 'updateSongInState'>;

// Union type for all collection types
export type AnySupabaseCollection = UsersCollection | SongsCollection | SupabaseCollection;

export type SongsProviderProps = {
    children: ReactNode;
    userId?: string;
    ids?: string[];
    page?: number;
    search?: string;
    pageSize?: number;
    initialSongs?: Song[];
};

/* ---------- Editing Context ---------- */
export type EditingContextType = {
    selectedColor: number | null;
    setSelectedColor: (color: number | null) => void;

    setColumns: (columns: number) => void;
    stepColumns: (step: number) => void;
    setFontSize: (fontSize: number) => void;
    stepFontSize: (step: number) => void;
    setFontFamily: (fontFamily: string) => void;
    setSectionColor: (sectionId: number, color: number | null) => void;
    setShowEditor: (show: boolean) => void;
    showEditor: boolean;
};

/* ---------- Pagination ---------- */
export type PaginationProps = {
    currentPage?: number;
    totalPages?: number;
    hasMore?: boolean;
    setLoading?: (loading: boolean) => void;
};

/* ---------- Radix UI ---------- */
export type RadixColor = ButtonProps["color"];

export type RadixVariant = ButtonProps["variant"];

export type TableHeader = {
    label: string;
    key: string;
    align?: "left" | "center" | "right";
    href?: (item: Song | Profile) => string;
    type?: "date" | "check" | "id";
    update?: (item: Song | Profile, header: TableHeader) => (value: any) => void;
    actions?: {
        [actionName: string]: (item: Song | Profile, key: string) => ReactNode;
    };
};
