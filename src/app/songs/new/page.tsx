"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

import { useError } from "@/contexts/errorContext";
import { useSongs } from "@/contexts/songsContext";

export default function NewSongPage() {
  const user = useSupabaseAuth();
  const { setError } = useError();
  const { fetchSongs } = useSongs();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [content, setContent] = useState("");
  // const [isPublic, setIsPublic] = useState(false);
  // const [allowInSetlists, setAllowInSetlists] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("User not authenticated");
      return;
    }

    const { error } = await supabase.from("songs").insert({
      title,
      artist,
      content,
      owner_id: user.id,
      is_public: false,
      allow_in_setlists: false,
    });

    if (error) {
      setError(error.message);
    } else {
      setTitle("");
      setArtist("");
      setContent("");
      setError(null);

      // refresh list so new song appears in context
      fetchSongs();

      // You might want to route somewhere else, too:
      // router.push(`/users/${user.username}/songs`);
    }
  };

  return (
    <main>
      <h1>New Song</h1>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
