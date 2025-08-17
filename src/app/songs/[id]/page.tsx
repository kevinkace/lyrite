"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

type Song = {
    id: string;
    title: string;
    artist: string | null;
    content: string;
    owner_id: string;
    is_public: boolean;
    allow_in_setlists: boolean;
};

export default function SongPage({ params }: { params: { id: string } }) {
    const user = useSupabaseAuth();
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        const fetchSong = async () => {
            const { data, error } = await supabase
                .from("songs")
                .select("*")
                .eq("id", params.id)
                .single();

            if (!error && data) setSong(data);
        };

        fetchSong();
    }, [params.id]);

    const handleFork = async () => {
        if (!user || !song) return;
        await supabase.from("songs").insert({
            title: song.title,
            artist: song.artist,
            content: song.content,
            owner_id: user.id,
            is_public: false,
            allow_in_setlists: false,
        });
        alert("Forked!");
    };

    if (!song) return <p>Loading...</p>;

    return (
        <main>
            <h1>{song.title}</h1>
            {song.artist && <h2>{song.artist}</h2>}
            <pre>{song.content}</pre>

            {user && <button onClick={handleFork}>Fork</button>}
        </main>
    );
}
