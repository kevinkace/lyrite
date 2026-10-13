"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Flex } from "@radix-ui/themes";

import { useSong } from "@/contexts/SongContext";
import { ANNOUNCEMENT_BANNERS } from "@/data/announcement";

import css from "./AnnounceHeader.module.css";

export default function AnnounceHeader() {
    const pathname = usePathname();
    const { song } = useSong();
    const isAnonymousSong = pathname.startsWith("/songs/")
        && pathname !== "/songs/new"
        && !!song
        && !song.user_id;
    const banner = isAnonymousSong ? ANNOUNCEMENT_BANNERS.anonymousSong : ANNOUNCEMENT_BANNERS.release;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(banner.storageKey);

            setOpen(saved === null && (!banner.excludedPath || pathname !== banner.excludedPath));
        } catch {
            // ignore (SSR safety)
        }
    }, [banner, pathname]);

    function handleClose() {
        try {
            localStorage.setItem(banner.storageKey, "1");
        } catch {
            // ignore
        }
        setOpen(false);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    layout
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.22 } }}
                    className={css.wrapper}
                >
                    <Flex
                        className={css.section}
                        direction="row"
                        align="center"
                        justify="center"
                        gap="6"
                    >
                        <Link href={banner.href}>
                            {banner.prefix && <strong>{banner.prefix}</strong>}
                            <span dangerouslySetInnerHTML={{ __html: banner.message }} />
                            {banner.suffix && <u className={css.suffix}>{banner.suffix}</u>}
                        </Link>

                        <Button
                            size="1"
                            variant="soft"
                            className={css.close}
                            aria-label="Close announcement"
                            onClick={handleClose}
                        >
                            ×
                        </Button>

                    </Flex>
                </motion.div>
            )}
        </AnimatePresence>
    );
}