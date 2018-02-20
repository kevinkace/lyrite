"use strict";

const m = require("mithril");

const state = require("./state");

require("minireset.css");
require("./index.css");

const header = require("./header");
const lyrics = require("./lyrics");
const home   = require("./home");

const mountEl = document.getElementById("mount");

// m.mount(mountEl, {
//     view : () => [
//         m(header),
//         state.song ? m(lyrics) : m(home)
//     ]
// });

function wrap(...components) {
    return {
        view : () => components.map(m)
    };
}

m.route.prefix("");
m.route(mountEl, "/", {
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
});

window.m = m;
