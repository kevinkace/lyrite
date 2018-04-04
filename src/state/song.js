import eol from "eol";
import hash from "string-hash";
import slugify from "slugify";
import { markdown } from "markdown";

import db from "../lib/db";

import defaultSongs from "./songs";

const titleSplit = "\n\n---\n\n";

function parseLyricString(lyricString) {
    return lyricString
        .split("\n\n")
        .map((text) => ({
            hash     : hash(text),
            markdown : markdown.toHTML(text),
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

export default (State) => ({
    // imports default songs to DB
    "IMPORT DEFAULT SONGS" : () => {
        const savedSongs = db.get("songs") || [];

        // add each default song
        defaultSongs.forEach((songString) => {
            const songObj = parseSongString(songString);

            // don't add if already in DB
            if(songObj.slug in savedSongs) {
                return;
            }

            songObj.default = true;

            db.set(`songs.${songObj.slug}`, songObj);
        });
    },

    // import song
    "IMPORT SONG LYRICS" : (songObj) => {
        const untitledSongs = db.get("songs?untitled");
        const title = `untitled ${Object.keys(untitledSongs).length + 1}`;
        const slug = slugify(title);

        db.set(`songs.${slug}`, Object.assign(songObj, {
            title,
            slug,
            lyrics   : parseLyricString(songObj.lyricString),
            untitled : true
        }));

        return slug;
    },

    "DELETE SONG BY SLUG" : (slug) => {
        db.del(`songs.${slug}`);
    },

    "SET TITLE" : (title) => {
        const oldSlug = State.song.slug;

        State.song.title = title;
        State.song.slug = slugify(State.song.title);
        delete State.song.untitled;

        db.set(`songs.${State.song.slug}`, State.song);
        db.del(`songs.${oldSlug}`);
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
