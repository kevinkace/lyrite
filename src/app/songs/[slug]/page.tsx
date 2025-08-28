"use client";

import { useUser } from "@/contexts/userContext";
import { useSong } from "@/contexts/songContext";

export default function SongPage({ params }: { params: { id: string } }) {
    const { song, loading, handleFork } = useSong();
    const { user } = useUser();


    if (loading) return <p>Loading...</p>;
    if (!song) return <p>Song not found</p>;


    if (!song) return <p>Loading...</p>;

    return (
        <>
            <h1>{song.title}</h1>
            {song.artist && <h2>{song.artist}</h2>}
            <pre>{song.lyrics}</pre>

            {user && <button onClick={() => handleFork({ user })}>Fork</button>}
        </>
    );
}
