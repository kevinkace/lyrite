"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

import { Song } from "@/types";

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("id, title, artist, is_public")
        .order("created_at", { ascending: false });

      if (!error && data) setSongs(data);
    };

    fetchSongs();
  }, []);

  if (!songs.length) return <p>No songs yet.</p>;

  return (
    <main>
      <h1>Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <Link href={`/songs/${song.id}`}>
              {song.title} {song.artist ? `– ${song.artist}` : ""}
              {song.is_public ? "" : " (private)"}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
