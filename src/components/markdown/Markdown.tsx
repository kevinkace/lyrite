import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createElement, Fragment, type ReactNode } from "react";
import { remark } from "remark";
import html from "remark-html";

// Escape a token so it can be safely used in a global regex when matching inline replacements.
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A replacement map lets markdown content swap a literal text token for a React node or component.
export type MarkdownReplacements = Record<string, ReactNode | ((props?: Record<string, unknown>) => ReactNode)>;

export default async function Markdown({
  data: dataPath,
  replacements = {},
}: {
  data: string;
  replacements?: MarkdownReplacements;
}) {
  const filePath = path.join(process.cwd(), dataPath);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { content } = matter(fileContents);

  // Sort longer keys first so shorter tokens do not accidentally steal matches from larger ones.
  const replacementEntries = Object.entries(replacements).sort((a, b) => b[0].length - a[0].length);

  if (replacementEntries.length === 0) {
    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();

    return contentHtml.trim() ? (
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    ) : null;
  }

  // Split the markdown into alternating text and component segments so inline replacements
  // can render as real React nodes while the surrounding markdown still gets processed normally.
  const pattern = new RegExp(replacementEntries.map(([key]) => escapeRegex(key)).join("|"), "g");
  const matches = Array.from(content.matchAll(pattern));
  const segments: Array<{ type: "markdown"; value: string } | { type: "component"; value: ReactNode; key: string }> = [];

  let lastIndex = 0;

  // Each replacement token is converted into a component segment while preserving the surrounding
  // markdown text before and after it, so the final output stays in order.
  for (const match of matches) {
    const matchText = match[0];
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      segments.push({
        type: "markdown",
        value: content.slice(lastIndex, matchIndex),
      });
    }

    const replacementComponent = replacements[matchText];
    segments.push({
      type: "component",
      value: typeof replacementComponent === "function"
        ? createElement(replacementComponent as (props?: Record<string, unknown>) => ReactNode)
        : replacementComponent,
      key: `${dataPath}-${matchIndex}-${matchText}`,
    });

    lastIndex = matchIndex + matchText.length;
  }

  if (lastIndex < content.length) {
    segments.push({
      type: "markdown",
      value: content.slice(lastIndex),
    });
  }

  const renderedParts = await Promise.all(
    segments.map(async (segment, index) => {
      if (segment.type === "component") {
        return <Fragment key={segment.key}>{segment.value}</Fragment>;
      }

      const processed = await remark().use(html).process(segment.value);
      const contentHtml = processed.toString();

      return contentHtml.trim() ? (
        <div key={`${dataPath}-${index}`} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      ) : null;
    }),
  );

  return <div>{renderedParts}</div>;
}
