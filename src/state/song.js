import eol from "eol";
import hash from "string-hash";
import slugify from "slugify";

import db from "./db";

import defaultSongs from "./songs";

const titleSplit = "\n\n---\n\n";

function parseLyricString(lyricString) {
    return lyricString
        .split("\n\n")
        .map((text) => ({
            hash : hash(text),
            text
        }));
}

function getSongParts(songString) {
    const parts = eol.lf(songString).split(titleSplit);
    const meta  = parts[0].split("\n");

    return {
        title       : meta[0],
        artist      : meta[1],
        lyricString : parts[1],
        slug        : slugify(meta[0])
    };
}

export default (State) => ({
    // imports default songs if not in DB
    "IMPORT DEFAULT SONGS" : () => {
        const savedSongs = db.get("songs") || [];

        defaultSongs.forEach((songString) => {
            const songObj = getSongParts(songString);

            // already in DB
            if(savedSongs[songObj.slug]) {
                return;
            }

            songObj.lyrics = parseLyricString(songObj.lyricString);

            db.set(`songs.${songObj.slug}`, songObj);
        });
    },

    // import song
    "IMPORT SONG LYRICS" : (lyricString) => {
        const untitledSongs = db.get("songs?untitled=true");
        const title = `untitled ${untitledSongs.length + 1}`;
        const slug = slugify(title);

        let song = {
            title,
            lyricString,
            slug,
            untitled : true,
            lyrics   : parseLyricString(lyricString)
        };

        db.set(`songs.${slug}`, song);

        return slug;
    },

    "SET TITLE" : (title) => {
        State.song.title = title;
        State.song.slug = slugify(State.song.title);
    },

    "OPEN SONG" : (idx) => {
        State.song = State.songs[idx];
    },

    "LOAD SONG BY SLUG" : (slug) => {
        State.song = db.get(`songs.${slug}`);

        if(!State.song) {
            State.error = "song not found";

            return;
        }

        return State.song;
    },

    "CLOSE SONG" : () => {
        delete State.song;
    },

    "TOGGLE EDIT CURRENT SONG" : () => {
        return State.edit ? State.action("CLOSE EDIT CURRENT SONG") : State.action("OPEN EDIT CURRENT SONG");
    },

    "OPEN EDIT CURRENT SONG" : () => {
        State.edit = true;
    },

    "CLOSE EDIT CURRENT SONG" : () => {
        State.edit = false;
    },

    "UPDATE PARSED LYRICS" : () => {
        State.song.lyrics = parseLyricString(State.song.lyricString);
    }
});
