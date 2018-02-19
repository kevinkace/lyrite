"use strict";

const m = require("mithril");

const css = require("./index.css");

const tools = require("../tools");

const state = require("../state");

module.exports = {
    oncreate : (vnode) => {
        state.header = {
            height : vnode.dom.offsetHeight
        };
    },
    view : () =>
        m("div", { class : css.header },
            m("h1", { class : css.title }, state.song ? state.song.title : "Lyrite"),
            m("div", { class : css.logo }, "logo"),
            state.song ? m(tools) : null
        )
};
