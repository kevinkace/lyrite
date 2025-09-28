"use client";

import { useEffect, useState }  from "react";
import { useRouter } from "next/navigation";

import { TextArea, TextField, Text, Flex, Button, Switch } from "@radix-ui/themes";

import { useError } from "@/contexts/ErrorContext";
import { useSong }  from "@/contexts/SongContext";
import { useAuth }  from "@/contexts/AuthContext";

import { getErrorMessage } from "@/lib/getErrorMessage";

import css from "./page.module.css";

export default function NewSongPage() {
    const router = useRouter();
    const { setError } = useError();
    const { createSong } = useSong();
    const { user, loading : userLoading } = useAuth();

    const [ title, setTitle ] = useState("");
    const [ artist, setArtist ] = useState("");
    const [ lyrics, setLyrics ] = useState("");
    const [ isPublic, setIsPublic ] = useState(false);

    useEffect(() => {
        if (!user && !userLoading) {
            router.replace("/login");
        }
    }, [user, userLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newSong = await createSong({
                song: {
                    title,
                    artist,
                    lyrics,
                    is_public: isPublic
                }
            });

            router.push(`/songs/${newSong.id}`);
        } catch (err: unknown) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <>
            <h1>New Song</h1>

            <Flex direction="column" gap="4" align="stretch" asChild >
                <form onSubmit={handleSubmit}>
                    <TextField.Root
                        name="title"
                        placeholder="Title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField.Root
                        name="artist"
                        placeholder="Artist"
                        value={artist}
                        required
                        onChange={(e) => setArtist(e.target.value)}
                    />

                    <TextArea
                        name="lyrics"
                        className={css.lyrics}
                        placeholder="Lyrics"
                        value={lyrics}
                        required
                        onChange={(e) => setLyrics(e.target.value)}
                    />

                    <Text as="label">
                        <Flex gap="2">
                            <Switch
                                name="isPublic"
                                checked={isPublic}
                                onCheckedChange={(checked) => setIsPublic(checked)}
                            />
                            public?
                        </Flex>
                    </Text>

                    <Button>Save</Button>
                </form>
            </Flex>
        </>
    );
};
