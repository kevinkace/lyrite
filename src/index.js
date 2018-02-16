"use strict";

const m = require("mithril");

const state = require("./state");

const css = require("./index.css");

const lyrics = require("./lyrics");
const toolbar = require("./toolbar");

const exampleLyrics = require("./example-lyrics");

m.mount(document.getElementById("mount"), {
    oninit : (vnode) => {
        state.lyrics = exampleLyrics;
        state.styles = [ "s0", "s1", "s2", "s3", "s4", "s5" ];
    },
    view : (vnode) => [
        m(lyrics),

        m(toolbar)
    ]
});
