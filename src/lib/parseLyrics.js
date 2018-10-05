import hash from "string-hash";

export default function parseLyricString(lyricString) {
    return lyricString
        .split("\n\n")
        .map((text) => ({
            hash : hash(text),
            text
        }));
}
