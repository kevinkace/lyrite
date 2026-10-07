import type { ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { clsx } from "clsx";

import css from "./Button.module.css";

type ItemLinkProps = {
    href: LinkProps["href"];
    children: ReactNode;
};

type SongLinkProps = {
    href: LinkProps["href"];
    title: string;
    artist: string;
    style?: "stacked" | "inline";
};

export const ItemLink = ({ href, children }: ItemLinkProps) => {
    return <Link href={href} className={css.itemLink}>
        {children}
    </Link>;
}

export const SongLink = ({ href, title, artist, style }: SongLinkProps) => {
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