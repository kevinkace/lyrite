"use strict";

const m = require("mithril");

const state = require("./state");

require("minireset.css");
require("./index.css");

const header = require("./header");
const lyrics = require("./lyrics");

const exampleSong = require("./example-song");

m.mount(document.getElementById("mount"), {
    oninit : () => {
        state.song = exampleSong;
        state.styles = [ "s0", "s1", "s2", "s3", "s4", "s5" ];
    },
    view : () => [
        m(header),
        m(lyrics)
    ]
});
