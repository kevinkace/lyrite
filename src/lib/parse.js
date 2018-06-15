import slugify from "slugify";
import eol from "eol";
import hash from "string-hash";

const titleSplit = "\n\n---\n\n";

function parseLyricString(lyricString) {
    return lyricString
        .split("\n\n")
        .map((text) => ({
            hash : hash(text),
            text
        }));
}

function parseSongString(songString) {
    const [ meta, lyricString ] = eol.lf(songString).split(titleSplit);
    const [ title, artist ] = meta.split("\n");

    return {
        slug : slugify(title),
        title,
        artist,
        lyricString : lyricString,
        lyrics      : parseLyricString(lyricString)
    };
}

export {
    parseLyricString as parseLyricString,
    parseSongString as parseSongString
};
