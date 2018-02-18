"use strict";

const m = require("mithril");

const State = {};

const styles = [ "s0", "s1", "s2", "s3", "s4", "s5" ];

const actions = {
    "CLICK LYRIC" : (idx) => {
        // Deselect lyric, no style is set
        if(State.selected === idx && !State.style) {
            delete State.selected;

            return;
        }

        // Always set selected otherwise
        State.selected = idx;

        if(!State.style) {
            return;
        }

        State.action("COLOR SELECTED LYRIC", State.style.idx);

        return;
    },

    "CLICK STYLE" : (idx) => {
        State.style = { idx };

        // Clicking first style after opening tools
        if(!State.tooltip) {
            // create tt obj
            State.tooltip  = { style : {} };

            // add listing for tt position
            window.addEventListener("mousemove", State.events.mousemove);
        }

        // Nothing is selected so don't color anything
        if(!State.selected && State.selected !== 0) {
            return;
        }

        // Color selected lyrics
        State.action("COLOR SELECTED LYRIC", idx);
    },

    "COLOR SELECTED LYRIC" : (idx) => {
        State.song.lyrics[State.selected].style = { idx };
    },

    "HIDE TOOLS" : () => {
        delete State.selected;
        delete State.style;
        delete State.tooltip;

        window.removeEventListener("mousemove", State.events.mousemove);
    }
};

// State

State.styles = styles;

State.events = {
    mousemove : (e) => {
        State.tooltip.style = {
            left : `${e.clientX}px`,
            top  : `${e.clientY}px`
        };

        m.redraw();
    }
};

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
