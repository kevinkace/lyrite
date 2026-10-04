"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { formattedDay } from "@/lib/dates";

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

    if (typeof content === "string" && header.truncate && content.length > header.truncate) {
        content = content.slice(0, header.truncate) + "...";
    }

    if (header.type === "date" && typeof content === "string") {
        content = formattedDay(content);
    }

    if (header.render) {
        return <div key={key} className={alignClass}>{header.render(item)}</div>;
    }

    if (header.href) {
        return <Link key={key} href={header.href(item)}>
            {content}
        </Link>;
    }

    if (header.type === "id") {
        return <span key={key} className={css.cellId}>{content}</span>;
    }

    return <div key={key} className={alignClass}>{content}</div>;
}
