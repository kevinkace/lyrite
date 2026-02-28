"use client";

import { Dialog, Flex, IconButton } from "@radix-ui/themes";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useModal } from "@/contexts/ModalContext";

import Confirm from "./Confirm";
import DownloadPII from "./DownloadPII";
import SongEditor from "./Editor";

import css from "./ModalRoot.module.css";

export default function ModalRoot() {
    const { modal, closeModal } = useModal();
    const { type, title, props } = modal;

    return (
        <AnimatePresence>
            {type && (
                <Dialog.Root open onOpenChange={(open) => !open && closeModal()}>
                    <Dialog.Content maxWidth="1200px" asChild>
                        <motion.div
                            initial={{ opacity : 0, y : 20 }}
                            animate={{ opacity : 1, y : 0 }}
                            exit={{ opacity : 0, y : 10 }}
                            transition={{ duration : 0.2, ease : "easeOut" }}
                        >
                            <Flex justify="between" align="center" mb="3" className={css.title}>
                                <Dialog.Title>
                                    {title}
                                </Dialog.Title>

                                <IconButton variant="ghost" size="1" color="gray" onClick={closeModal}>
                                    <X />
                                </IconButton>
                            </Flex>

                            {type === "error" && <p>{props?.message as React.ReactNode}</p>}

                            {type === "confirm" && (
                                <Confirm {...props} closeModal={closeModal} />
                            )}

                            {type === "downloadPII" && (
                                <DownloadPII onDownload={props?.onDownload as () => void} {...props} closeModal={closeModal} />
                            )}

                            {type === "editor" && (
                                <SongEditor {...props} closeModal={closeModal} />
                            )}
                        </motion.div>
                    </Dialog.Content>
                </Dialog.Root>
            )}
        </AnimatePresence>
    );
}
