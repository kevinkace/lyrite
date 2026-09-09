"use client";

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
};

export default function DeleteSongDialog({
    songId,
    title,
    onDelete,
}: DeleteSongDialogProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton color="crimson">
                    <Trash2 />
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Content >
                <Dialog.Title>Delete song?</Dialog.Title>
                <Dialog.Description>
                    Are you sure you want to delete your song? This action cannot be undone.

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
