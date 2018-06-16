import m from "mithril";
import slugify from "slugify";

import db from "./db";
import db2 from "../db";

import defaultSongs from "./songs";

import { parseLyricString, parseSongString } from "../lib/parse";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

export default (State) => ({
    "SET SLUG" : (slug) => {
        State.slug = slug;
    },

    "LOAD SLUG" : (slug) => {
        State.song = {
            slug,
            loading : true
        };

        State.unsubscribe = db2.collection("songs").where("slug", "==", slug)
            .onSnapshot((snap) => {
                delete State.song.loading;
                State.song.loaded = Date.now();

                // should just be 1 doc
                snap.forEach((doc, idx) => {
                    if(idx) {
                        return;
                    }

                    State.song.doc = doc;
                    State.song.data = doc.data();
                    State.song.id = doc.id;
                    State.song.parsedLyrics = parseLyricString(State.song.data.lyrics);
                });

                m.redraw();
            });
    },

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

    "UPDATE PARSED LYRICS" : (lyrics) => {
        const doc = db2.collection("songs").doc(State.song.id);

        State.song.data.lyrics = lyrics;
        doc.set(State.song.data);
        // State.song.lyrics = parseLyricString(State.song.lyricString);
    }
});
