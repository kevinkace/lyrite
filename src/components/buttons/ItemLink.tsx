import Link from "next/link";
import { clsx } from "clsx";

import css from "./Button.module.css";

export const ItemLink = ({ href, children } ) => {
    return <Link href={href} className={css.itemLink}>
        {children}
    </Link>;
}

export const SongLink = ({ href, title, artist, style }) => {
    return <Link
        href={href}
        className={clsx(
            css.songLink,
            { [css.songLinkStacked] : style === "stacked" }
        )}
    >
        <span className={css.itemTitle}>{title}</span>
        {style !== "stacked" && " - "}
        <span className={css.itemArtist}>{artist}</span>
    </Link>;
}