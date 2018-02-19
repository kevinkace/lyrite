"use strict";

module.exports = (State) => ({
    "LOAD SONG" : (songString) => {
        let song = {
            title : "fake title",
            lyrics : [{
                hash : "asdfasdf",
                text : "Here's fake lyrics"
            }]
        };

        State.songs = State.songs || [];
        State.songs.push(song);
    },

    "OPEN SONG" : (idx) => {
        State.song = State.songs[idx];
    }
});
