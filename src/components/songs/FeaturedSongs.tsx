"use client";

import Link from "next/link";
import { Card, Flex } from "@radix-ui/themes";

import { useSongs } from "@/contexts/SongsContext";

import css from "./FeaturedSongs.module.css";

export default function FeaturedSongs() {
    const { songs } = useSongs();

    return <Flex
            // direction={{
            //     initial : "column",
            //     md : "row"
            // }}
            gap={{
                initial : "2",
                md : "4"
            }}
            justify="center"
            align="center"
            className={css.cards}
        >
        {songs.map((song) => (
            <Card key={song.id} size="3" asChild>
                <Link
                    href={`/songs/${song.id}`}
                    key={song.id}
                    className={css.card}
                    aria-label={`View details for ${song.title} by ${song.artist}`}
                    data-testid={`featured-song-${idx}`}
                >
                    <h3 className={css.title}>{song.title}</h3>
                    <p className={css.artist}>{song.artist}</p>
                    <p className={css.lyrics}>
                        <span>{song.lyrics}</span>
                    </p>
                    {/* <p className={css.user}>{song.user_id || "Unknown artist"}</p> */}
                </Link>
            </Card>
        ))}
    </Flex>;
}
