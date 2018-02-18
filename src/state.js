"use strict";

const m = require("mithril");

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

        State.tooltip = {
            style : {
                top : "100px"
            }
        };

        State.events.mousemove = (e) => {
            State.tooltip.style = {
                left : `${e.clientX}px`,
                top  : `${e.clientY}px`
            };

            m.redraw();
        };

        window.addEventListener("mousemove", State.events.mousemove);

        if(!State.selected && State.selected !== 0) {
            return;
        }

        State.song.lyrics[State.selected].styleIdx = idx;
    },

    "HIDE TOOLS" : () => {
        delete State.selected;
        delete State.style;

        window.removeEventListener("mousemove", State.events.mousemove);
    }
};

// State

State.styles = styles;

State.events = {};

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
