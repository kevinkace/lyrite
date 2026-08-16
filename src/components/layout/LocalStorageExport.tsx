"use client";

import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";

export default function LocalStorageExport() {
    const [localData, setLocalData] = useState<string | boolean>(false);

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
            setLocalData(false);
        }
    }, []);

    const downloadLocalStorage = () => {

        const data = Object.entries(JSON.parse(localData as string))
            .filter(([key, value]) => !value.default)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Record<string, any>);

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

    return localData && (
        <Button onClick={downloadLocalStorage} variant="soft" color="gray">
            Backup
        </Button>
    );
}
