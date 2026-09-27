"use client";

import {
    Dialog,
    Button,
    Flex,
    IconButton,
} from "@radix-ui/themes";
import { Trash2 } from "lucide-react";

import css from "./DeleteDialog.module.css";

type DeleteDialogProps = {
    id: string;
    title: string;
    itemType: "song" | "setlist";
    onDelete: (id: string) => void;
};

export default function DeleteDialog({
    id,
    title,
    itemType,
    onDelete,
}: DeleteDialogProps) {
    const label = itemType.toLowerCase();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton color="crimson">
                    <Trash2 />
                </IconButton>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>
                    Delete {label}?
                </Dialog.Title>

                <Dialog.Description>
                    Are you sure you want to delete your {label}? This action
                    cannot be undone.
                    <br />

                    <span className={css.itemTitlePrompt}>
                        Delete:{" "}
                        <strong className={css.itemTitle}>{title}</strong>
                        ?
                    </span>
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>

                    <Dialog.Close>
                        <Button
                            color="crimson"
                            onClick={() => onDelete(id)}
                        >
                            Delete
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
