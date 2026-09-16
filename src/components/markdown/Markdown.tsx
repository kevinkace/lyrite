import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createElement, Fragment, type ReactNode } from "react";
import { remark } from "remark";
import html from "remark-html";


export type MarkdownMetadata = Record<string, string | number | boolean | null | undefined>;

export type MarkdownData = { content: string; metadata: MarkdownMetadata; };

export type MarkdownReplacements = Record<string, ReactNode | ((props?: Record<string, unknown>) => ReactNode)>;

type Segment = { type: "markdown"; value: string } | { type: "component"; value: ReactNode; key: string };


// Escapes regex special chars so a token is matched literally.
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


async function renderMarkdownToHtml(markdown: string): Promise<string | null> {
    const rendered = (await remark().use(html).process(markdown)).toString();

    return rendered.trim() ? rendered : null;
}

export function getMarkdownData(dataPath: string): MarkdownData {
    const fileContents = fs.readFileSync(path.join(process.cwd(), dataPath), "utf8");
    const { content, data } = matter(fileContents);

    return { content, metadata: data as MarkdownMetadata };
}

export default async function Markdown({
    data: dataPath,
    replacements = {},
}: {
    data: string;
    replacements?: MarkdownReplacements;
}) {
    const { content } = getMarkdownData(dataPath);

    // longest keys first, avoids partial-token matches
    const entries = Object.entries(replacements).sort((a, b) => b[0].length - a[0].length);

    if (entries.length === 0) {
        const contentHtml = await renderMarkdownToHtml(content);

        return contentHtml ? <div dangerouslySetInnerHTML={{ __html: contentHtml }} /> : null;
    }

    // Split content on replacement tokens to render as React nodes
    const pattern = new RegExp(entries.map(([key]) => escapeRegex(key)).join("|"), "g");
    const segments: Segment[] = [];
    let lastIndex = 0;

    for (const match of content.matchAll(pattern)) {
        const [matchText] = match;
        const matchIndex = match.index ?? 0;

        if (matchIndex > lastIndex) {
            segments.push({ type: "markdown", value: content.slice(lastIndex, matchIndex) });
        }

        const replacement = replacements[matchText];

        segments.push({
            type: "component",
            value: typeof replacement === "function" ? createElement(replacement as (props?: Record<string, unknown>) => ReactNode) : replacement,
            key: `${dataPath}-${matchIndex}-${matchText}`,
        });

        lastIndex = matchIndex + matchText.length;
    }

    if (lastIndex < content.length) {
        segments.push({ type: "markdown", value: content.slice(lastIndex) });
    }

    const renderedParts = await Promise.all(segments.map(async (segment, index) => {
        if (segment.type === "component") {
            return <Fragment key={segment.key}>{segment.value}</Fragment>;
        }

        const contentHtml = await renderMarkdownToHtml(segment.value);

        return contentHtml ?
            <div key={`${dataPath}-${index}`} dangerouslySetInnerHTML={{ __html: contentHtml }} /> :
            null;
    }));

    return <div>{renderedParts}</div>;
}
