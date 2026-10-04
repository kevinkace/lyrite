"use client";

import { useSongs } from "@/contexts/SongsContext";
import SongsTable from "@/components/songs/SongsTable";

export default function SongsTableContainer({ editControls = false }: { editControls?: boolean }) {
    const collection = useSongs();
    return <SongsTable collection={collection} editControls={editControls} />;
}