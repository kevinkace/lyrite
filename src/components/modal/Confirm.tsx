"use client";

import { useState } from "react";
import { Dialog, Flex, Button, TextField, Text } from "@radix-ui/themes";

export default function ConfirmDelete({
    onConfirm,
    closeModal,
    confirmCta = "Confirm",
    cancelCta = "Cancel",

    description = "Review this action before confirming.",

    confirmRequirement
}: {
    onConfirm?: () => void;
    closeModal: () => void;

    description?: string;

    confirmCta? : string;
    cancelCta? : string;

    confirmRequirement? : string;
}) {
    const [input, setInput] = useState("");
    const isValid = !confirmRequirement || input.trim() === confirmRequirement;

    return (
        <Flex direction="column" gap="4">

            <Dialog.Description>
                {description}
            </Dialog.Description>

            {confirmRequirement && (
                <>
                    <Text size="2">
                        Type <b>{confirmRequirement}</b> to confirm.
                    </Text>

                    <TextField.Root
                        placeholder="delete account"
                        value={input}
                        required={true}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </>
            )}

            <Flex justify="end" gap="2">
                <Button variant="soft" onClick={() => closeModal()}>
                    {cancelCta}
                </Button>
                <Button color={confirmRequirement ? "red" : "violet"} disabled={!isValid} onClick={() => {
                    if (onConfirm) {
                        onConfirm();
                    }

                    closeModal();
                }}>
                    {confirmCta}
                </Button>
            </Flex>
        </Flex>
    );
}
