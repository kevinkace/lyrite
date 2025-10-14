"use client";

import { useState } from "react";
import { Flex, Button, TextField, Text } from "@radix-ui/themes";

export default function ConfirmDelete({
    onConfirm,
    closeModal,
}: {
    onConfirm: () => void;
    closeModal: () => void;
}) {
    const [input, setInput] = useState("");
    const isValid = input.trim().toLowerCase() === "delete account";

    return (
        <Flex direction="column" gap="3">
            <Text size="2">
                To confirm, type <b>delete account</b> below:
            </Text>

            <TextField.Root
                placeholder="delete account"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <Flex justify="end" gap="2">
                <Button variant="soft" onClick={closeModal}>
                    Cancel
                </Button>
                <Button color="red" disabled={!isValid} onClick={onConfirm}>
                    Delete
                </Button>
            </Flex>
        </Flex>
    );
}
