import React from "react";
import { Songs } from "@/types";
import Link from "next/link";

type SongsListProps = {
  songs: Songs;
};

export default function SongsList({ songs }: SongsListProps) {
  if (!songs.length) return <p>No songs found.</p>;

  return (
    <ul>
      {songs.map((song) => (
        <li key={song.id}>
          <Link href={`/songs/${song.id}`}>
            <strong>{song.title}</strong> — {song.artist}
          </Link>
        </li>
      ))}
    </ul>
  );
}
