// components/SongList.tsx
"use client";
import { useSongs } from "@/contexts/songsContext";

export default function SongList() {
  const { songs, loading } = useSongs();

  if (loading) return <p>Loading…</p>;
  if (songs.length === 0) return <p>No songs yet</p>;

  return (
    <ul>
      {songs.map(song => (
        <li key={song.id}>{song.title}</li>
      ))}
    </ul>
  );
}
