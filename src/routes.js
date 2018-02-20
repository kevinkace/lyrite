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
        onmatch : (args) => {
            if(!state.songs) {
                state.action("LOAD SONGS");
            }

            return wrap(header, home);
        }
    },

    "/:slug" : {
        onmatch : (args) => {
            if(!state.songs) {
                state.action("LOAD SONGS");
            }

            state.action("OPEN SONG BY SLUG", args.slug);

            return wrap(header, lyrics);
        }
    }
};
