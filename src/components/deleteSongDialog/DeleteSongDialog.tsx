"use client";

import {
    Dialog,
    Button,
    Flex,
    IconButton,
} from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

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
                    <TrashIcon/>
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Content >
                <Dialog.Title>Delete song?</Dialog.Title>
                <Dialog.Description>
                    Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
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
