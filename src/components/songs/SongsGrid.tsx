import type { ReactNode } from "react";
import { Card, Grid, Flex } from "@radix-ui/themes";

import { SongLink } from "@/components/buttons/ItemLink";
import { DateDisplay } from "@/components/dates/DateDisplay";

import type { Song, TableHeader } from "@/types";

import css from "./SongsGrid.module.css";

type SongActionRenderer = (song: Song) => ReactNode;

type SongsGridProps = {
    songs: Song[];
    headers: TableHeader[];
    onRemove?: SongActionRenderer | null;
    onTogglePublic?: SongActionRenderer | null;
};

export default function SongsGrid({ songs, headers, onRemove, onTogglePublic }: SongsGridProps) {
    const titleHeader = headers.find((header) => header.key === "title");
    const getTitleHref = titleHeader?.href;
    if (!getTitleHref) {
        throw new Error("SongsGrid requires a title header with an href");
    }

    return <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
        {songs.map((song) => (
            <Card className={css.card} key={song.id}>
                <div className={css.cardHeader}>
                    <SongLink
                        href={getTitleHref(song)}
                        title={song.title}
                        artist={song.artist}
                        style={"stacked"}
                    />
                </div>

                <div className={css.cardContent}>
                    {song.lyrics.slice(0, 200) + "..."}

                    <Flex justify="between" className={css.dates}>
                        <Flex gap="2">
                            created:
                            <DateDisplay style="long">{song.created_at}</DateDisplay>
                        </Flex>
                        <Flex gap="2">
                            updated:
                            <DateDisplay style="long">{song.updated_at}</DateDisplay>
                        </Flex>
                    </Flex>
                </div>

                {(onRemove || onTogglePublic) && <Flex className={css.cardFooter} justify="between" align="center">
                    {onRemove && onRemove(song)}
                    {onTogglePublic && onTogglePublic(song)}
                </Flex>}

            </Card>
        ))}
    </Grid>
}