"use client";

import { Card, Flex } from "@radix-ui/themes";

import { useSong } from "@/contexts/SongContext";

import css from "./EditSong.module.css";

export default function EditSong() {
    const { song, loading } = useSong();

    if (loading) return <p>Loading…</p>;
    if (!song) return <p>Song not found</p>;

    const split = song.lyrics.split("\n\n");

    return (
        <Flex gap="4" direction="column" className={css.container}>
            {split.map((line, index) => (
                <Card key={index} variant="surface">
                    <pre className={css.lyric} contentEditable>{line}</pre>
                </Card>
            ))}
        </Flex>
    );
};
