import { Card, Grid } from "@radix-ui/themes";

import TableCell        from "@/components/table/TableCell";

import css from "./SongsGrid.module.css";

export default function SongsGrid({ songs, headers }) {
    return <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
        {songs.map((song) => (
            <Card className={css.card} key={song.id}>
                {headers.map((header, index) => (
                    <div
                        key={header.key + song.id}
                        className={index === 0 ? css.cardHeader : css.cardField}
                    >
                        {index > 0 && <span className={css.cardLabel}>{header.label}</span>}
                        <TableCell item={song} header={header} />
                    </div>
                ))}
            </Card>
        ))}
    </Grid>
}