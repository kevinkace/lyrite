import { useMemo } from "react";
import { Card, Grid, Flex } from "@radix-ui/themes";

import { SongLink } from "@/components/buttons/ItemLink";
import { DateDisplay } from "@/components/dates/DateDisplay";

import css from "./SongsGrid.module.css";

export default function SongsGrid({ songs, headers }) {
    const headerByKey = useMemo(
        () => Object.fromEntries(headers.map(h => [h.key, h])),
        [headers]
    );

    return <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
        {songs.map((song) => (
            <Card className={css.card} key={song.id}>
                <div className={css.cardHeader}>
                    <SongLink
                        href={headerByKey.title.href(song)}
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

                <div className={css.cardFooter}>

                </div>

            </Card>
        ))}
    </Grid>
}