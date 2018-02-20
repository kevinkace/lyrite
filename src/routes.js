"use strict";

const m = require("mithril");

const state = require("./state");

const header = require("./header");
const lyrics = require("./lyrics");
const home   = require("./home");

function wrap(...components) {
    return {
        view : () => components.map(m)
    };
}

module.exports = {
    "/"      : {
        onmatch : () => {
            if(!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            } else {
                state.action("CLOSE SONG");
            }

            return wrap(header, home);
        }
    },

    "/:slug" : {
        onmatch : (args) => {
            if(!state.songs) {
                state.action("LOAD DEFAULT SONGS");
            }

            state.action("OPEN SONG BY SLUG", args.slug);

            return wrap(header, lyrics);
        }
    }
};
