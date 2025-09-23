"use client";

import { useState }  from "react";
import { useRouter } from "next/navigation";

import { useError } from "@/contexts/ErrorContext";
import { useSong }  from "@/contexts/SongContext";
import { useAuth }  from "@/contexts/AuthContext";

import { getErrorMessage } from "@/lib/getErrorMessage";

import css from "./page.module.css";

export default function NewSongPage() {
    const router = useRouter();
    const { setError } = useError();
    const { handleSave } = useSong();
    const { user } = useAuth();

    const [ title, setTitle ] = useState("");
    const [ artist, setArtist ] = useState("");
    const [ lyrics, setLyrics ] = useState("");

    // redirect to home if not logged in
    if (!user) {
        router.replace("/");

        return null;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newSong = await handleSave({
                user,
                song: {
                    title,
                    artist,
                    lyrics,
                    is_public: false
                }
            });

            router.push(`/songs/${user.id}/${newSong.slug}`);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <>
            <h1>New Song</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    required
                    onChange={(e) => setArtist(e.target.value)}
                />
                <textarea
                    className={css.lyrics}
                    placeholder="Lyrics"
                    value={lyrics}
                    required
                    onChange={(e) => setLyrics(e.target.value)}
                />
                <button type="submit">Save</button>
            </form>
        </>
    );
};
