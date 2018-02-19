"use strict";

const eol = require("eol");
const hash = require("string-hash");

const titleSplit = "\n\n---\n\n";

module.exports = (State) => ({
    "LOAD SONG" : (songString) => {
        const parts = eol.lf(songString).split(titleSplit);
        const song = {};

        if(parts.length > 2) {
            State.error = "loading a incorrectly formatted song";

            return;
        }

        State.songs = State.songs || [];
        State.songs.push(song);

        if(parts.length === 2) {
            song.title = parts[0];
            song.lyrics = parts[1];
        } else {
            song.title = `untitled ${State.songs.length}`;
            song.lyrics = parts[0];
        }

        song.lyrics = song.lyrics
            .split("\n\n")
            .map((text) => ({
                hash : hash(text),
                text
            }));


        // let song = {
        //     title : "fake title",
        //     lyrics : [{
        //         hash : "asdfasdf",
        //         text : "Here's fake lyrics"
        //     }]
        // };
    },

    "OPEN SONG" : (idx) => {
        State.song = State.songs[idx];
    }
});
