"use client";

import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";

interface V1Song {
  default: boolean;
}

export default function LocalStorageExport({
    label = "Download your v1 song data",
}: {
    label?: string;
}) {
    const [localData, setLocalData] = useState<string | null>(null);

    useEffect(() => {
        try {
            if (typeof window === "undefined" || !window.localStorage) {
                return;
            }

            const songs = localStorage.getItem("songs");
            const hasData = songs !== null && songs !== undefined && songs !== "";

            if (!hasData) {
                return;
            }

            setLocalData(songs);
        } catch (e) {
            setLocalData(null);
        }
    }, []);

    const downloadLocalStorage = () => {

        const parsed = JSON.parse(localData as string) as V1Song;
        const data = Object.entries(parsed)
            .filter(([key, value]: [string, V1Song]) => !value.default)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Record<string, V1Song>);

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "lyrite-v1-backup.json";

        document.body.appendChild(a);

        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return localData ? (
        <Button onClick={downloadLocalStorage} variant="soft" color="gray">
            {label}
        </Button>
    ) : null;
}
