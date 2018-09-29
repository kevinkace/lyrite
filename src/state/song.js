import slugify from "slugify";

import db, { fsDelete, fsTimestamp } from "../db";

import { parseLyricString } from "../lib/parse";
import { getSongFromId } from "../lib/song";

export default (State) => ({
    SET_SLUG(slug) {
        State.slug = slug;
    },

    LOAD_SONG_BY_SLUG(slug) {
        State.song = {
            slug,
            loading : true
        };

        State.unsubscribe = db.collection("songs").where("slug", "==", slug)
            .onSnapshot((snap) => {
                delete State.song.loading;
                State.song.loaded = Date.now();

                // should just be 1 doc
                snap.forEach((doc, idx) => {
                    if (idx) {
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
    LOAD_SONGS_LIST() {
        State.songs = {
            loading : true,
            songs   : [] // State.songs.songs !@#$@
        };

        db.collection("songs").onSnapshot((snap) => {
            delete State.songs.loading;
            State.songs.loaded = Date.now();
            State.songs.songs = [];

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
    IMPORT_SONG_LYRICS(songObj) {
        const slug = slugify(songObj.title);

        return db.collection("songs").add({
            artist     : songObj.artist,
            created_at : fsTimestamp(),
            // todo: user id
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

    CLOSE_SONG() {
        if (State.unsubscribe) {
            State.unsubscribe();
        }

        delete State.unsubscribe;
        delete State.song;
    },

    TOGGLE_EDIT_CURRENT_SONG() {
        return State.edit ? State.action("CLOSE_EDIT_CURRENT_SONG") : State.action("OPEN_EDIT_CURRENT_SONG");
    },

    OPEN_EDIT_CURRENT_SONG() {
        State.edit = true;
    },

    CLOSE_EDIT_CURRENT_SONG() {
        State.edit = false;
    },

    UPDATE_PARSED_LYRICS(lyrics) {
        const doc = db.collection("songs").doc(State.song.id);

        State.song.data.lyrics = lyrics;
        doc.set(State.song.data);
    },

    // fake delete with undo, then real delete
    // - track deleted songs locally on State.delete = { id : true }
    // -
    DELETE_SONG_BY_ID(id) {
        State.deleted = State.deleted || {};

        // already queued to be deleted
        if (State.deleted[id]) {
            return;
        }

        // mark as deleted in Firestore
        db.collection("songs").doc(id).update({
            deleted_at : Date.now()
        })
            .then(() => {
                // timeout to actually delete
                const timeoutId = setTimeout(() => {
                    db.collection("songs").doc(id).delete()
                        .then(() => {
                            delete State.deleted[id];
                            m.redraw();
                        })
                        .catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                }, 5000);

                State.deleted[id] = {
                    timeoutId,
                    song : getSongFromId(id)
                };

                m.redraw();
            });

    },

    UNDO_DELETE_SONG_BY_ID(id) {
        if (!State.deleted || !State.deleted[id]) {
            return;
        }

        clearTimeout(State.deleted[id].timeoutId);

        db.collection("songs").doc(id).update({ deleted_at : fsDelete() })
            .then(() => {
                delete State.deleted[id];
                m.redraw();
            });
    }
});
