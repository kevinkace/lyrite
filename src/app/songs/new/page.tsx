"use client";

import { useEffect, useState }  from "react";
import { useRouter } from "next/navigation";

import { TextArea, TextField, Text, Flex, Button, Switch, Card } from "@radix-ui/themes";

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
            <Flex direction="column" align="center">
                <h1>New Song</h1>

                <Card size="4" className={css.card}>
                    <Flex direction="column" gap="4" align="stretch" asChild >
                        <form onSubmit={handleSubmit}>
                            <TextField.Root
                                name="title"
                                placeholder="Title"
                                value={title}
                                required
                                size="3"
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <TextField.Root
                                name="artist"
                                placeholder="Artist"
                                value={artist}
                                required
                                size="3"
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

                                <Text size="2" color="gray" mt="1">
                                Public songs can be viewed by other users.
                                </Text>
                            </Text>

                            <Flex justify="center">
                                <Button size="4" variant="soft" className={css.button}>Save</Button>
                            </Flex>
                        </form>
                    </Flex>
                </Card>
            </Flex>
        </>
    );
};
