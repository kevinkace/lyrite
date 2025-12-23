import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pick } from "lodash";

import { Flex, Button, TextField, TextArea, Text, Switch } from "@radix-ui/themes";

import { useSong }  from "@/contexts/SongContext";
import { useError } from "@/contexts/ErrorContext";

import { getErrorMessage } from "@/lib/getErrorMessage";

import css from "./SongEdit.module.css";

const fallback = {
    title: "",
    artist: "",
    lyrics: "",
    is_public: false
};

export default function SongEditor({ isNew = false, onSave }: { isNew?: boolean; onSave?: () => void }) {
    const router = useRouter();

    const { setError } = useError();
    const { song, createSong, updateSong } = useSong();

    const [ saving, setSaving ] = useState(false);

    const getFormData = (songData: typeof song) => ({
        ...(!isNew && pick(songData, ['title', 'artist', 'lyrics', 'is_public'])),
        ...fallback
    });

    const [ formData, setFormData ] = useState(() => getFormData(song));

    useEffect(() => {
        if (isNew) {
            return;
        }

        setFormData(getFormData(song));
    }, [song]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSaving(true);

        onSave?.();

        try {
            if (song) {
                await updateSong(formData);

                return;
            }

            const newSong = await createSong({
                song: formData
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
                value={formData.title}
                required
                size="3"
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />

            <TextField.Root
                disabled={saving}
                name="artist"
                placeholder="Artist"
                value={formData.artist}
                required
                size="3"
                onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
            />

            <TextArea
                disabled={saving}
                name="lyrics"
                className={css.lyrics}
                placeholder="Lyrics"
                value={formData.lyrics}
                required
                onChange={(e) => setFormData(prev => ({ ...prev, lyrics: e.target.value }))}
            />

            <Text as="label">
                <Flex gap="2">
                    <Switch
                        name="isPublic"
                        checked={formData.is_public}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
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
                    disabled={saving}
                    type="submit"
                >
                    {saving ? "Saving..." : "Save Song"}
                </Button>
            </Flex>
        </form>
    </Flex>;
}
