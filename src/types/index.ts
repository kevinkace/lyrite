export type User = {
    id: string;
    email: string;
    display_name?: string | null;
    created_at?: string;
    updated_at?: string;
};

export type Song = {
    id?: string;
    slug?: string;
    title: string;
    artist: string | null;
    lyrics: string | null;
    is_public: boolean;
    allow_in_setlists: boolean;
    parent_id?: string | null;   // forked from this song
    user_id?: string;
    created_at?: string;
    updated_at?: string;
};

export type Setlist = {
    id: string;
    name: string;
    description: string | null;
    is_public: boolean;
    user_id: string;
    created_at?: string;
    updated_at?: string;
};

export type SetlistSong = {
    id: string;
    setlist_id: string;
    song_id: string;
    position: number;
    created_at?: string;
    updated_at?: string;
};
