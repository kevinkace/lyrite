import { useSongs } from "@/contexts/SongsContext";

import { Card, Flex } from "@radix-ui/themes";

import css from "./FeaturedSongs.module.css";
import Link from "next/link";

export default function FeaturedSongs() {
    const { songs, loading } = useSongs();

    if (loading || songs === undefined) return <p>Loading…</p>;

    return <Flex gap="6" justify="center" align="center" className={css.cards}>
        {songs.map((song) => (
            <Card key={song.id} size="3" asChild>
                <Link href={`/songs/${song.id}`} key={song.id} className={css.card} aria-label={`View details for ${song.title} by ${song.artist}`}>
                    <h3 className={css.title}>{song.title}</h3>
                    <p className={css.artist}>{song.artist}</p>
                    <p className={css.lyrics}>{song.lyrics.substring(0, 250)}{song.lyrics.length > 100 ? "…" : ""}</p>
                    {/* <p className={css.user}>{song.user_id || "Unknown artist"}</p> */}
                </Link>
            </Card>
        ))}
    </Flex>;
}
