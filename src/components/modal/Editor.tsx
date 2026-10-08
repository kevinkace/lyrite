"use client";

import { Dialog, Flex, Button } from "@radix-ui/themes";

import SongEditor from "../songs/SongEditor";

export default function Editor({
    closeModal,
}: {
    closeModal: () => void;
}) {
    return (
        <Flex direction="column" gap="3">

            <Dialog.Description>
                Edit the song lyrics below, then save your changes.
            </Dialog.Description>

            <SongEditor onSave={closeModal} />

            <Flex justify="end" gap="2">
                <Button variant="soft" onClick={closeModal}>
                    Cancel
                </Button>
            </Flex>
        </Flex>
    );
}
