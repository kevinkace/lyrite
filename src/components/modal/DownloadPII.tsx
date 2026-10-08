"use client";

import { Dialog, Flex, Button } from "@radix-ui/themes";

export default function DownloadPII({
    onDownload,
    closeModal,
}: {
    onDownload: () => void;
    closeModal: () => void;
}) {
    return (
        <Flex direction="column" gap="3">
            <Dialog.Description>
                Download a copy of your personal data (PII) for your records.
            </Dialog.Description>

            <Flex justify="end" gap="2">
                <Button variant="soft" onClick={closeModal}>
                    Cancel
                </Button>
                <Button onClick={onDownload}>Download</Button>
            </Flex>
        </Flex>
    );
}
