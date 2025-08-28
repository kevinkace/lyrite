"use client";

import { useState } from "react";

import { useError } from "@/contexts/errorContext";
import { useSong } from "@/contexts/songContext";
import { useUser }  from "@/contexts/userContext";

export default function NewSongPage() {
  const { setError } = useError();
  const { handleSave } = useSong();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [content, setContent] = useState("");
  // const [isPublic, setIsPublic] = useState(false);
  // const [allowInSetlists, setAllowInSetlists] = useState(false);



  return (
    <>
      <h1>New Song</h1>
      <form onSubmit={() => handleSave({ user })}>
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
    </>
  );
}
