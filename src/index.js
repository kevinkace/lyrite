"use strict";

const m = require("mithril");

const state = require("./state");

require("minireset.css");
require("./index.css");

const header = require("./header");
const lyrics = require("./lyrics");
const home   = require("./home");

const exampleSong = require("./example-song");

m.mount(document.getElementById("mount"), {
    oninit : () => {
        // state.load({ song : exampleSong });
    },
    view : () => [
        m(header),
        state.song ? m(lyrics) : m(home)
    ]
});

window.m = m;