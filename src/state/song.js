import m from "mithril";
import slugify from "slugify";

import db2 from "../db";

import { parseLyricString } from "../lib/parse";

export default (State) => ({
    "SET SLUG" : (slug) => {
        State.slug = slug;
    },

    "LOAD SONG BY SLUG" : (slug) => {
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

                    State.song.doc  = doc;
                    State.song.id   = doc.id;
                    State.song.data = doc.data();

                    State.song.parsedLyrics = parseLyricString(State.song.data.lyrics);
                });

                m.redraw();
            });
    },

    // imports default songs to DB
    "LOAD SONGS LIST" : () => {
        State.songs = {
            loading : true,
            songs   : [] // State.songs.songs !@#$@
        };

        db2.collection("songs").onSnapshot((snap) => {
            delete State.songs.loading;
            State.songs.loaded = Date.now();

            snap.forEach((doc) => {
                State.songs.songs.push({
                    doc,
                    id   : doc.id,
                    data : doc.data()
                });
            });

            m.redraw();
        });
    },

    // import song
    "IMPORT SONG LYRICS" : (songObj) => {
        const slug = slugify(songObj.title);

        return db2.collection("songs").add({
            artist     : songObj.artist,
            created_at : Date.now(),
            created_by : "users/is8T9YLdvlAB6yfqJlX4",
            lyrics     : songObj.lyrics,
            slug       : slug,
            title      : songObj.title
        })
        .then((doc) => {
            return {
                slug,
                id : doc.id
            };
        });
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
    }
});
