"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@radix-ui/themes";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { useSong }    from "@/contexts/SongContext";
import { useLayout }  from "@/contexts/LayoutContext";
import { useEditing } from "@/contexts/EditingContext";
import { useAuth }    from "@/contexts/AuthContext";

import { getfontFamilyCSS } from "@/lib/fonts";

import Toolbar from "@/components/song/Toolbar";
import {SaveIcon } from "@/components/icons/SaveIcon";

import css from "./EditSong.module.css";

export default function EditSong() {
    const { song, loading, saveSong, dirty } = useSong();
    const { user } = useAuth();
    const { setHeaderContent, setHeaderUserContent, startLoading, stopLoading } = useLayout();
    const { setSectionColor, selectedColor, setSelectedColor } = useEditing();

    const isOwner = !!song && !!user && song.user_id === user.id;
    const [ showTools, setShowTools ]     = useState(false);
    const [ saveStatus, setSaveStatus ] = useState<"idle" | "saving" | "saved">("idle");

    useEffect(() => {
        if (!dirty || !song) return;

        const timeout = setTimeout(async () => {
            setSaveStatus("saving");

            try {
                await saveSong();
                setSaveStatus("saved");
            } catch {
                setSaveStatus("idle");
            }
        }, 800);

        return () => clearTimeout(timeout);
    }, [dirty, saveSong, song]);

    useEffect(() => {
        if (loading) {
            startLoading();
        } else {
            stopLoading();
        }

        if (loading || !song) {
            setHeaderContent(null);
            setHeaderUserContent(null);

            return;
        }

        setHeaderContent(<>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
        </>);

        if (!isOwner) {
            setHeaderUserContent(null);
            setShowTools(false);

            return;
        }

        setHeaderUserContent(<>
            <SaveIcon
                dirty={dirty}
                saveStatus={saveStatus}
                onSavedAnimationEnd={() => setSaveStatus("idle")}
            />

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
    }, [dirty, isOwner, loading, saveStatus, selectedColor, setHeaderContent, setHeaderUserContent, setSelectedColor, showTools, song, startLoading, stopLoading]);

    if (loading) return <p>Loading…</p>;
    if (!song) return <p>Song not found</p>;


    return (
        <div className={css.editSong} data-testid="edit-song">
            {isOwner && (
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
            )}

            <div
                className={css.lyrics}
                style={{
                    columns: song.style?.columns,
                    fontSize : song.style?.fontSize,
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
