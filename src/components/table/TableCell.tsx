"use client";

import Link from "next/link";
import { Switch, Flex } from "@radix-ui/themes";

import { formattedDay } from "@/lib/dates";

import css from "./Table.module.css"

import { Song, Profile, TableHeader } from "@/types";

const MAX_LYRIC_LEN = 200;
export default function TableCell({
    item,
    header,
    label = false
}: {
    item: Song | Profile;
    header: TableHeader;
    label?: boolean;
}) {
    let content = (item as any)[header.key];

    const key = header.key + item.id;
    const align = header.align || "left";
    const alignClass = {
        left: css.alignLeft,
        center: css.alignCenter,
        right: css.alignRight
    }[align];

    if (header.key === "lyrics" && content.length > MAX_LYRIC_LEN) {
        content = content.slice(0, MAX_LYRIC_LEN) + "..."
    }

    if (header.type === "date") {
        content = formattedDay(content);
    }

    if (header.href) {
        return <Link key={key} href={header.href(item)}>
            {content}
        </Link>;
    }

    if (header.type === "check" && header.update) {
        const SwitchEl = () => (<Switch
            key={key}
            checked={content}
            onCheckedChange={header.update?.(item, header)}
        />);

        if (label) {
            return (<Flex asChild align="center" gap="3">
                <label>
                    <SwitchEl />
                    <span className={css.switchLabel}>{header.label}</span>
                </label>
            </Flex>);
        }

        return (
            <div key={key} className={alignClass}>
                <SwitchEl />
            </div>
        );
    }

    if (header.actions) {
        return (
            <div key={key} className={alignClass}>
                {Object.entries(header.actions).map(([actionName, action]) => action(item, key))}
            </div>
        );
    }

    if (header.type === "id") {
        return <span key={key} className={css.cellId}>{content}</span>;
    }

    return <div key={key} className={alignClass}>{content}</div>;
}
