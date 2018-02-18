"use strict";
const state = {};

const actions = {
    "CLICK LYRIC" : (idx) => {
            if(state.selected === idx) {
                delete state.selected;

                return;
            }

            state.selected = idx;

            return;
    },

    "CLICK STYLE" : (idx) => {
        if(!state.selected && state.selected !== 0) {
            return;
        }

        state.song.lyrics[state.selected].styleIdx = idx;
    }
};

state.action = (name, value) => actions[name](value);

module.exports = state;
