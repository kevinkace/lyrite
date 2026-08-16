"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Flex } from "@radix-ui/themes";

import css from "./AnnounceHeader.module.css"

const STORAGE_KEY = "announce-v2-closed";

export default function AnnounceHeader() {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "1") setOpen(false);
        } catch (e) {
            // ignore (SSR safety)
        }
    }, []);

    function handleClose() {
        try {
            localStorage.setItem(STORAGE_KEY, "1");
        } catch (e) {
            // ignore
        }
        setOpen(false);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
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
                        <Link href="/docs/announce-v2">
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