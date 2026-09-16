"use client";

import { useEffect, useState } from "react";
import { Button, Spinner, Flex } from "@radix-ui/themes";
import { Ghost } from "lucide-react";

import css from "./LocalStorageExport.module.css";

interface V1Song {
  default: boolean;
}

export default function LocalStorageExport({
    label = "Download your v1 song data",
}: {
    label?: string;
}) {
    const [localData, setLocalData] = useState<string | null>(null);
    const [showFirst, setShowFirst] = useState(true);


    useEffect(() => {

        try {
            if (typeof window === "undefined" || !window.localStorage) {
                return;
            }

            const songs = localStorage.getItem("songs");
            const hasData = songs !== null && songs !== undefined && songs !== "";

            if (!hasData) {
                const timer = setTimeout(() => setShowFirst(false), 1500);

                return () => clearTimeout(timer);
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

    if (localData) {
        return <Button
            onClick={downloadLocalStorage}
            variant="soft"
            color="gray"
        >
            {label}
        </Button>;
    }

    return showFirst ?
        <Flex gap="3" align="center" className={css.searching}>
            <Spinner size="3" />
            <p>Looking for local data...</p>
        </Flex> :
        <Flex gap="2" align="center" className={css.nonFound}>
            <Ghost/>
            <p>No local data was found. See more info: <a href="/docs/support">Support</a>.</p>
        </Flex>;
}
