"use client";

import { useEffect, useState } from "react";
import { Button, Card, IconButton } from "@radix-ui/themes";
import { ChevronDown, SlidersHorizontal, Save } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { useSong } from "@/contexts/SongContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useEditing } from "@/contexts/EditingContext";

import { getfontFamilyCSS } from "@/lib/fonts";

import Toolbar from "@/components/song/Toolbar";

import css from "./EditSong.module.css";
import { LyricParsed } from "@/types";

export default function EditSong() {
    const { song, loading, saveSong, updateSection, mergeSections, splitSection } = useSong();
    const { setHeaderContent, setHeaderUserContent, startLoading, stopLoading } = useLayout();
    const { setSectionColor, selectedColor, setSelectedColor } = useEditing();

    const [showTools, setShowTools] = useState(false);

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
                className={clsx(css.save, { [css.loadingSave]: showLoading })}
                disabled={showLoading}
                onClick={() => {
                    saveSong();

                    setShowLoading(true);
                    setTimeout(() => setShowLoading(false), 1000);
                }}
            >
                <Save />
            </IconButton>

            {/* unsaved changes indicator */}
            {(
                <div className={css.unsavedChangesIndicator}>
                    * unsaved tes
                </div>
            )}

            <Button variant="surface" size="2" radius="full" onClick={() => {
                setSelectedColor(null);
                setShowTools(!showTools)
            }}>
                <SlidersHorizontal />
                tools
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


    const contentEditable = selectedColor === null;

    return (
        <div className={css.editSong}>
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
                }  as React.CSSProperties}
            >
                {song.lyrics_parsed.map(({id, text, style}) => (
                    <Card
                        key={id}
                        variant="ghost"
                        className={
                            clsx(
                                css.lyricCard,
                                css[`style-${style.color}`],
                                {
                                    [css.hoverFill] : typeof selectedColor === "number",
                                    [css.contentEditable] : contentEditable
                                },

                            )}
                        onClick={() => {
                            if (selectedColor !== null) {
                                setSectionColor(id, style.color === selectedColor ? null : selectedColor);
                            }
                        }}
                    >
                        <div
                            contentEditable={contentEditable}
                            suppressContentEditableWarning
                            onFocus={() => {
                                // esc to deselect
                                window.addEventListener("keydown", e => {
                                    if (e.key === "Escape") {
                                        (document.activeElement as HTMLElement).blur();
                                    }
                                }, { once: true });
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();

                                    const selection = window.getSelection();

                                    if (!selection?.rangeCount) return;

                                    const range = selection.getRangeAt(0);

                                    range.deleteContents();
                                    range.insertNode(document.createTextNode("\n"));
                                    range.collapse(false);
                                }

                                // merge sections if backspace at start
                                if (e.key === "Backspace") {
                                    const selection = window.getSelection();

                                    if (!selection?.rangeCount) return;

                                    const range = selection.getRangeAt(0);

                                    if (range.startOffset === 0 && range.endOffset === 0) {
                                        e.preventDefault();

                                        mergeSections(id);
                                    }
                                }
                            }}
                            onInput={(e) => {
                                updateSection(id, { text: e.currentTarget.textContent ?? "" });
                            }}
                        >
                            {text}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
