"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Flex } from "@radix-ui/themes";

import css from "./AnnounceHeader.module.css"

const STORAGE_KEY = "announce-v2-closed";
const PAGE_PATH = "/docs/announcing-lyrite-v2";

export default function AnnounceHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(pathname !== PAGE_PATH);

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
                            Announcing lyrite version 2!
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