"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Flex } from "@radix-ui/themes";

import { ANNOUNCEMENT_STORAGE_KEY } from "@/data/announcement";

import css from "./AnnounceHeader.module.css"

const PAGE_PATH = "/docs/announcing-lyrite-v2";

export default function AnnounceHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);

            setOpen(saved === null && pathname !== PAGE_PATH);
        } catch {
            // ignore (SSR safety)
        }
    }, [pathname]);

    function handleClose() {
        try {
            localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "1");
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
                        <Link href={PAGE_PATH}>
                            <strong>NEW!</strong>
                            {" "}
                            Announcing Lyrite version 2!
                            {" "}
                            <u>read more</u>
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