import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Flex, Button, TextField, TextArea, Text, Switch } from "@radix-ui/themes";

import { useSong }  from "@/contexts/SongContext";
import { useError } from "@/contexts/ErrorContext";

import { getErrorMessage } from "@/lib/getErrorMessage";

import css from "./SongEdit.module.css";

export default function SongEditor({ onSave }: { onSave: () => void }) {
    const router = useRouter();

    const { setError } = useError();
    const { createSong, song, updateSong } = useSong();

    const [ saving, setSaving ] = useState(false);
    const [ title, setTitle ] = useState(song?.title || "");
    const [ artist, setArtist ] = useState(song?.artist || "");
    const [ lyrics, setLyrics ] = useState(song?.lyrics || "");
    const [ isPublic, setIsPublic ] = useState(song?.is_public || false);

    useEffect(() => {
        setTitle(song?.title || "");
        setArtist(song?.artist || "");
        setLyrics(song?.lyrics || "");
        setIsPublic(song?.is_public || false);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSaving(true);

        onSave();

        try {
            if (song) {
                await updateSong({
                    title,
                    artist,
                    lyrics,
                    is_public: isPublic
                });

                return;
            }

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

    return <Flex direction="column" gap="4" align="stretch" asChild >
        <form
            onSubmit={handleSubmit}
        >
            <TextField.Root
                disabled={saving}
                name="title"
                placeholder="Title"
                value={title}
                required
                size="3"
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField.Root
                disabled={saving}
                name="artist"
                placeholder="Artist"
                value={artist}
                required
                size="3"
                onChange={(e) => setArtist(e.target.value)}
            />

            <TextArea
                disabled={saving}
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
                <Button
                    size="4"
                    variant="soft"
                    className={css.button}
                >
                    Save
                </Button>
            </Flex>
        </form>
    </Flex>;
}
