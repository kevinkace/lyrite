"use strict";

const State = {};

const styles = [ "s0", "s1", "s2", "s3", "s4", "s5" ];

const actions = {
    "CLICK LYRIC" : (idx) => {
            if(State.selected === idx) {
                delete State.selected;

                return;
            }

            State.selected = idx;

            return;
    },

    "CLICK STYLE" : (idx) => {
        State.style = {
            idx
        };

        if(!State.selected && State.selected !== 0) {
            return;
        }

        State.song.lyrics[State.selected].styleIdx = idx;
    },

    "HIDE TOOLS" : () => {
        delete State.selected;
        delete State.style;
    }
};

// State

State.styles = styles;

State.action = (name, value) => actions[name](value);

State.load   = (songObj) => {
    if(songObj.action) {
        State.error("NO ACTION");

        return;
    }

    State.song = songObj.song;
};

State.error = (err) => {
    console.error(err);
}

module.exports = State;
