"use client";

import { Flex, Button } from "@radix-ui/themes";

import SongEditor from "../songs/SongEditor";

export default function Editor({
    closeModal,
}: {
    closeModal: () => void;
}) {
    return (
        <Flex direction="column" gap="3">

            <SongEditor />

            <Flex justify="end" gap="2">
                <Button variant="soft" onClick={closeModal}>
                    Cancel
                </Button>
            </Flex>
        </Flex>
    );
}
