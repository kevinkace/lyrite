"use client";

import type { ReactNode } from "react";

import { DateDisplay } from "@/components/dates/DateDisplay";
import { ItemLink } from "@/components/buttons/ItemLink";

import css from "./Table.module.css"

import { Song, Profile, TableHeader } from "@/types";

export default function TableCell({
    item,
    header
}: {
    item: Song | Profile;
    header: TableHeader;
}) {
    let content: ReactNode = (item as unknown as Record<string, ReactNode>)[header.key];

    const key = header.key + item.id;
    const align = header.align || "left";
    const alignClass = {
        left: css.alignLeft,
        center: css.alignCenter,
        right: css.alignRight
    }[align];

    // Lyrics
    if (typeof content === "string" && header.truncate && content.length > header.truncate) {
        content = content.slice(0, header.truncate) + "...";
    }

    // dates
    if (header.type === "date" && typeof content === "string") {
        content = <DateDisplay style="long">{content}</DateDisplay>;
    }

    // actions, buttons, switches
    if (header.render) {
        return <div key={key} className={alignClass}>{header.render(item)}</div>;
    }

    // links
    if (header.href) {
        return <ItemLink key={key} href={header.href(item)}>
            {content}
        </ItemLink>;
    }

    if (header.type === "id") {
        return <span key={key} className={css.cellId}>{content}</span>;
    }

    return <div key={key} className={alignClass}>{content}</div>;
}
