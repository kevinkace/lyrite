"use client";

import { useEffect, useState } from "react";
import { Button, Card, IconButton } from "@radix-ui/themes";
import { ChevronDown, SlidersHorizontal, Save } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { useSong }    from "@/contexts/SongContext";
import { useLayout }  from "@/contexts/LayoutContext";
import { useEditing } from "@/contexts/EditingContext";

import { getfontFamilyCSS } from "@/lib/fonts";

import Toolbar from "@/components/song/Toolbar";

import css from "./EditSong.module.css";

export default function EditSong() {
    const { song, loading, saveSong, dirty } = useSong();
    const { setHeaderContent, setHeaderUserContent, startLoading, stopLoading } = useLayout();
    const { setSectionColor, selectedColor, setSelectedColor } = useEditing();

    const [ showTools, setShowTools ]     = useState(false);
    const [ showLoading, setShowLoading ] = useState(false);

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
            <IconButton
                variant="ghost"
                size="2"
                radius="full"
                className={clsx(
                    css.save,
                    {
                        [css.loadingSave]: showLoading,
                        [css.saveClean]: !dirty
                    }
                )}
                disabled={showLoading}
                onClick={() => {
                    if (!dirty) return;

                    saveSong();

                    setShowLoading(true);
                    setTimeout(() => setShowLoading(false), 1000);
                }}
            >
                <Save />

                {dirty && !showLoading ?
                    (<motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className={css.unsavedChangesIndicator}>
                            *
                        </div>
                    </motion.div>) :
                null}
            </IconButton>

            {/* unsaved changes indicator */}

            <Button variant="surface" size="2" radius="full" onClick={() => {
                setSelectedColor(null);
                setShowTools(!showTools)
            }}>
                <SlidersHorizontal />

                <span className={css.toolsLabel}>tools</span>

                <ChevronDown />
            </Button>
        </>);

        return () => {
            setHeaderContent(null);
            setHeaderUserContent(null);
        };
    }, [setHeaderContent, song, loading, showTools, showLoading]);

    if (loading) return <p>Loading…</p>;
    if (!song) return <p>Song not found</p>;


    return (
        <div className={css.editSong} data-testid="edit-song">
            <AnimatePresence initial={false}>
                {showTools && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={css.toolsWrapper}
                    >
                        <Toolbar />
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className={css.lyrics}
                style={{
                    columns: song.style.columns,
                    fontSize : song.style.fontSize,
                    "--default-font-family": getfontFamilyCSS(song.style.fontFamily || ""),
                    "--hover-color": `var(--color-${selectedColor}-selected)`
                } as React.CSSProperties}
            >
                {song.lyrics_parsed.map(({id, text, style}) => (
                    <Card
                        key={id}
                        variant="ghost"
                        className={clsx(
                            css.lyricCard,
                            css[`style-${style.color}`],
                            {
                                [css.hoverFill] : typeof selectedColor === "number"
                            }
                        )}
                        onClick={() => {
                            if (selectedColor !== null) {
                                setSectionColor(id, style.color === selectedColor ? null : selectedColor);
                            }
                        }}
                    >
                        <div>
                            {text}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
