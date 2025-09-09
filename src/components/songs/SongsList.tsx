import React from "react";
import { Song } from "@/types";

type SongsListProps = {
  songs: Song[];
};

export default function SongsList({ songs }: SongsListProps) {
  if (!songs.length) return <p>No songs found.</p>;

  return (
    <ul>
      {songs.map((song) => (
        <li key={song.id}>
          <strong>{song.title}</strong>
           —
          {song.artist}
        </li>
      ))}
    </ul>
  );
}
