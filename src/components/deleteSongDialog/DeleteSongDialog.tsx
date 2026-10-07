"use client";

import type { ComponentProps } from "react";
import {
    Dialog,
    Button,
    Flex,
    IconButton,
} from "@radix-ui/themes";
import { Trash2 } from "lucide-react";

import css from "./DeleteSongDialog.module.css";

type DeleteSongDialogProps = {
    songId: string;
    title: string;
    onDelete: (id: string) => void;
    size?: ComponentProps<typeof IconButton>["size"];
};

export default function DeleteSongDialog({
    songId,
    title,
    onDelete,
    size
}: DeleteSongDialogProps) {
    return (
        <Dialog.Root>

            <Dialog.Trigger>
                <IconButton color="crimson" size={size} variant={"soft"}>
                    <Trash2 />
                </IconButton>
            </Dialog.Trigger>

            <Dialog.Content >
                <Dialog.Title>Delete song?</Dialog.Title>
                <Dialog.Description>
                    Are you sure you want to delete your song? This action cannot be undone.<br/>

                    <span className={css.songTitlePrompt}>
                        Delete: {" "}
                        <strong className={css.songTitle}>{title}</strong>
                        ?
                    </span>
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end" >
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            color="crimson"
                            onClick={() => onDelete(songId)}
                        >
                            Delete
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>

        </Dialog.Root>
    );
}
