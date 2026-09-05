"use client";

import Link from "next/link";
import { Switch, Flex } from "@radix-ui/themes";

import { formattedDay } from "@/lib/dates";

import css from "./Table.module.css"

import { Song, Profile, TableHeader } from "@/types";

const MAX_LYRIC_LEN = 200;

export default function TableCell({ item, header, label }: { item: Song | Profile; header: TableHeader; label : boolean }) {
    let content = (item as any)[header.key];

    const key = header.key + item.id;

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

    if (header.type === "check" && typeof header.update === "function") {

        if (label) {
            return (<Flex asChild align="center" gap="3">
                <label>
                    <Switch
                        key={key}
                        checked={content}
                        onCheckedChange={header.update(item, header)}
                    />
                    <span className={css.switchLabel}>{header.label}</span>
                </label>
            </Flex>);
        }
        return (<Switch
            key={key}
            checked={content}
            onCheckedChange={header.update(item, header)}
        />);
    }

    if (header.actions) {
        return (
            <div key={key}>
                {Object.entries(header.actions).map(([actionName, action]) => action(item, key))}
            </div>
        );
    }

    if (header.type === "id") {
        return <span key={key} className={css.cellId}>{content}</span>;
    }

    return content;
}
