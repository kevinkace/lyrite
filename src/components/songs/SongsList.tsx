import React from "react";

import Link from "next/link";

import { SongsListProps } from "@/types";

export default function SongsList({ songs }: SongsListProps) {
  if (!songs?.length) return null;

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
