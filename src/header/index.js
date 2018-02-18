"use strict";

const m = require("mithril");

const css = require("./index.css");

const icons = require("../icons.svg");

const state = require("../state");

module.exports = {
    view : (vnode) =>
        m("div", { class : css.header },
            m("h1", { class : css.title }, state.song.title ),
            m("div", { class : css.logo }, "logo"),
            m("div", { class : vnode.state.show ? css.tools : css.toolsHide },
                m("button", {
                        class : css.show,
                        onclick : () => {
                            vnode.state.show = !vnode.state.show;
                            
                            if(!vnode.state.show) {
                                state.selected = false;
                            }
                        }
                    },
                    m("svg",
                        m("use", {
                            "xlink:href" : `${icons}#icon-quill`
                        })
                    )
                ),
                state.styles.map((style, idx) =>
                    m("button", {
                        class : css[style],

                        onclick : () => {
                            if(isNaN(state.selected)) {
                                return;
                            }

                            state.song.lyrics[state.selected].styleIdx = idx;
                        }
                    }, `Style ${idx}`)
                )
            )
        )
};
