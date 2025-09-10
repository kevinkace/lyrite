"use client";

import EditSong from "@/components/song/EditSong";
import { SongProvider } from "@/contexts/songContext";
import { use } from "react";

export default function SongBySlug({ params }: { params: Promise<{ userId: string; slug: string }> }) {
  const { userId, slug } = use(params);

  return (
    <SongProvider userId={userId} slug={slug}>
      <EditSong />
    </SongProvider>
  );
}
