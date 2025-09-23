"use client";

import { Button } from "@radix-ui/themes";
import { useError } from "@/contexts/ErrorContext";

export default function ErrorButton() {
    const { setError } = useError();

    return (
        <Button color="red" onClick={() => setError("This is a test error!")}>
            Trigger Error Modal
        </Button>
    );
}
