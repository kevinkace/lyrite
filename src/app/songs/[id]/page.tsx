import { notFound } from "next/navigation";

import Layout   from "@/components/layout/Layout";
import EditSong from "@/components/song/EditSong";

import { EditingProvider } from "@/contexts/EditingContext";
import { SongProvider }    from "@/contexts/SongContext";

import { defaultStyles } from "@/data/consts";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { parseLyrics }                from "@/lib/songs";

import type { Song } from "@/types";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function SongPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!UUID_PATTERN.test(id)) notFound();

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;
    if (!data) notFound();

    const song = {
        ...data,
        lyrics_parsed: data.lyrics_parsed ?? parseLyrics(data.lyrics),
        style: data.style ?? defaultStyles,
    } as Song;

    return (
        <Layout>
            <SongProvider key={song.id} initialSong={song}>
                <EditingProvider>
                    <EditSong />
                </EditingProvider>
            </SongProvider>
        </Layout>
    );
}
