"use client";

import { useSong } from "@/contexts/songContext";

export default function SongPage() {
    const { song, loading } = useSong();

    if (loading) return <p>Loading...</p>;
    if (!song) return <p>Song not found</p>;

    return (
        <>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
            <pre>{song.lyrics}</pre>
        </>
    );
}
