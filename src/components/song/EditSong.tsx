"use client";

import { Card, Flex } from "@radix-ui/themes";
import clsx from "clsx";

import { useSong } from "@/contexts/SongContext";
import { useLayout } from "@/contexts/LayoutContext";

import css from "./EditSong.module.css";
import { useEffect } from "react";

export default function EditSong() {
    const { song, loading } = useSong();
    const { setHeaderContent } = useLayout();

    useEffect(() => {
        if (loading || !song) {
            setHeaderContent(null);
            return;
        }

        setHeaderContent(<>{song.title} by {song.artist}</>);

        // Clean up the header content when the component unmounts
        return () => setHeaderContent(null);
    }, [setHeaderContent, song]);

    if (loading) return <p>Loading…</p>;
    if (!song) return <p>Song not found</p>;


    return (
        <div className={css.editSong}>
            <Flex align="center" className={css.tools} >
                font size, font face, columns, alignment
            </Flex>
            <div className={css.lyrics}>
                {song.lyrics_parsed.map(({id, text, style}, index) => (
                    <Card
                        key={index}
                        variant="surface"
                        className={clsx(css.lyricCard, css[`style-${style}`])}
                    >
                        <pre className={css.lyric}>{text}</pre>
                    </Card>
                ))}
            </div>
        </div>
    );
};
