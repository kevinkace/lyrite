"use client";

import { Button } from "@radix-ui/themes";

import { ANNOUNCEMENT_STORAGE_KEY } from "@/data/announcement";

export function ClearAnnounceButton() {
    function handleClear() {
        localStorage.removeItem(ANNOUNCEMENT_STORAGE_KEY);
        window.location.reload();
    }

    return (
        <Button variant="soft" onClick={handleClear}>
            Show announcement again
        </Button>
    );
}
