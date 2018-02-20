"use strict";

const m = require("mithril");

const state = require("./state");

require("minireset.css");
require("./index.css");

const header = require("./header");
const lyrics = require("./lyrics");
const home   = require("./home");

const mountEl = document.getElementById("mount");

m.mount(mountEl, {
    view : () => [
        m(header),
        state.song ? m(lyrics) : m(home)
    ]
});

window.m = m;
