"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@radix-ui/themes";
import { MixerHorizontalIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import { useSong } from "@/contexts/SongContext";
import { useLayout } from "@/contexts/LayoutContext";

import Toolbar from "@/components/song/Toolbar";

import css from "./EditSong.module.css";

export default function EditSong() {
    const { song, loading } = useSong();
    const { setHeaderContent, setHeaderUserContent, startLoading, stopLoading } = useLayout();

    const [showTools, setShowTools] = useState(false);

    useEffect(() => {
        if (loading) {
            startLoading();
        } else {
            stopLoading();
        }

        if (loading || !song) {
            setHeaderContent(null);

            return;
        }

        setHeaderContent(<>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
        </>);

        setHeaderUserContent(<>
            <Button variant="surface" size="2" radius="full" onClick={() => setShowTools(!showTools)}>
                <MixerHorizontalIcon />
                tools
                <ChevronDownIcon />
            </Button>
        </>);

        return () => {
            setHeaderContent(null);
            setHeaderUserContent(null);
        };
    }, [setHeaderContent, song, loading, showTools]);

    if (loading) return <p>Loading…</p>;
    if (!song) return <p>Song not found</p>;


    return (
        <div className={css.editSong}>
            {showTools && <Toolbar />}
            <div
                className={css.lyrics}
                style={{
                    columns: song.style.columns,
                    fontSize : song.style.fontSize,
                    fontFamily: song.style.fontFamily
                }  as React.CSSProperties}
            >
                {song.lyrics_parsed.map(({id, text, style}, index) => (
                    <Card
                        key={id}
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
