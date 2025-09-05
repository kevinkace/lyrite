"use client";

import { useUser } from "@/contexts/userContext";
import { useSongs } from "@/contexts/songsContext";

export default function SongPage() {
    const { user, loading: userLoading } = useUser();
    const { songs, loading: songsLoading } = useSongs();

    if (userLoading || songsLoading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;

    return (
        <>
            <h1>{user?.user_metadata?.preferred_username}</h1>

            {/* user songs list */}
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <h2>{song.title}</h2>
                        <p>{song.artist}</p>
                    </li>
                ))}
            </ul>

        </>
    );
}
