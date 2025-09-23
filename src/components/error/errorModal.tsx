"use client";

import { Dialog, Flex, IconButton, Button } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

import { useError } from "@/contexts/ErrorContext";

export default function ErrorModal() {
    const { error, setError } = useError();

    if (!error) return null;

    return (
        <Dialog.Root open={!!error} onOpenChange={() => !open && setError(null)}>
            <Dialog.Content>
                <Dialog.Title>
                    <Flex justify="between" align="center" mb="3">
                        Error

                        <IconButton
                            variant="ghost"
                            size="1"
                            color="gray"
                            onClick={() => setError(null)}
                        >
                            <Cross2Icon />
                        </IconButton>
                    </Flex>
                </Dialog.Title>

                <p>{error}</p>

                <Flex justify="end">
                    <Button color="red" onClick={() => setError(null)}>
                        Close
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
