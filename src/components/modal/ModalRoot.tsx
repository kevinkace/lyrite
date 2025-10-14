"use client";

import { Dialog, Flex, IconButton, Button } from "@radix-ui/themes";
import { X } from "lucide-react";

import { useModal } from "@/contexts/ModalContext";

import ConfirmDelete from "./ConfirmDelete";
import DownloadPII from "./DownloadPII";

export default function ModalRoot() {
    const { modal, closeModal } = useModal();
    const { type, props } = modal;

    if (!type) return null;

    return (
        <Dialog.Root open onOpenChange={(open) => !open && closeModal()}>
            <Dialog.Content maxWidth="450px">
                <Flex justify="between" align="center" mb="3">
                    <Dialog.Title>
                        {type === "error"
                            ? "Error"
                            : type === "confirmDelete"
                                ? "Delete Account"
                                : type === "downloadPII"
                                    ? "Download Data"
                                    : "Modal"}
                    </Dialog.Title>

                    <IconButton variant="ghost" size="1" color="gray" onClick={closeModal}>
                        <X />
                    </IconButton>
                </Flex>

                {type === "error" && <p>{props?.message}</p>}

                {type === "confirmDelete" && (
                    <ConfirmDelete {...props} closeModal={closeModal} />
                )}

                {type === "downloadPII" && (
                    <DownloadPII {...props} closeModal={closeModal} />
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
}
