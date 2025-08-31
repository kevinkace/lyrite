// app/songs/[userId]/[slug]/page.tsx
"use client";

import { useUser } from "@/contexts/userContext";
import { useSong } from "@/contexts/songContext";

export default function SongPage() {
    const { song, loading, handleFork } = useSong();
    const { user } = useUser();

    if (loading) return <p>Loading...</p>;
    if (!song) return <p>Song not found</p>;

    return (
        <>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
            <pre>{song.lyrics}</pre>

            {user && <button onClick={() => handleFork({ user })}>Fork</button>}
        </>
    );
}
