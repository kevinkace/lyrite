"use client";

import EditSong from "@/components/song/EditSong";
import { SongProvider } from "@/contexts/songContext";
import { use } from "react";

export default function SongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <SongProvider id={id}>
      <EditSong />
    </SongProvider>
  );
}
