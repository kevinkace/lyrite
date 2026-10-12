import type { LyricParsed } from "@/types";

export function parseLyrics(raw: string): LyricParsed[] {
    return raw.split(/\n{2,}/).map((section, id) => ({
        id,
        text: section.trim(),
        style: {},
    }));
}
