"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Select } from "@radix-ui/themes";
import { MixerHorizontalIcon, ChevronDownIcon, PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import { useSong } from "@/contexts/SongContext";
import { useLayout } from "@/contexts/LayoutContext";

import { colors, fontFamilies, fontSizes } from "@/data/consts";

import css from "./EditSong.module.css";

export default function EditSong() {
    const { song, loading, stepColumns } = useSong();
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
            {showTools && <Flex align="center" className={css.tools} >

                {/* ==== FONT SIZE ==== */}
                <Flex data-tools="font-size" align="center">
                    <Button variant="outline" size="2" color="gray" onClick={() => { }}>
                        <MinusIcon />
                    </Button>
                    <Select.Root>
                        <Select.Trigger/>
                        <Select.Content>
                            {fontSizes.map(size => (
                                <Select.Item key={size} value={size.toString()}>{size}px</Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                    <Button variant="outline" size="2" color="gray" onClick={() => { }}>
                        <PlusIcon />
                    </Button>
                </Flex>


                {/* ==== FONT FAMILY ==== */}
                <Flex data-tool="font-family" align="center">
                    <Select.Root>
                        <Select.Trigger />
                        <Select.Content>
                            {fontFamilies.map(family => (
                                <Select.Item key={family} value={family}>{family}</Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Flex>

                {/* ==== COLUMNS ==== */}
                <Flex data-tools="columns" align="center">
                    <Button variant="outline" size="2" color="gray" onClick={() => stepColumns(-1)}>
                        <MinusIcon />
                    </Button>
                    cols: {song.style?.columns}
                    <Button variant="outline" size="2" color="gray" onClick={() => stepColumns(1)}>
                        <PlusIcon />
                    </Button>
                </Flex>


                {/* ==== COLORS ==== */}
                <Flex data-tools="colors" align="center">
                    {colors.map(color => (
                        <Button
                            key={color}
                            variant="soft"
                            size="2"
                            color={color}
                        >
                            {color}
                        </Button>
                    ))}
                </Flex>


            </Flex>}
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
