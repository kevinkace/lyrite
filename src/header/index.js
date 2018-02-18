"use strict";

const m = require("mithril");

const css = require("./index.css");

const tools = require("../tools");

const state = require("../state");

module.exports = {
    view : () =>
        m("div", { class : css.header },
            m("h1", { class : css.title }, state.song.title ),
            m("div", { class : css.logo }, "logo"),
            m(tools)
        )
};
