"use strict";

const m = require("mithril");

const css = require("./index.css");

const icons = require("../icons.svg");

const state = require("../state");

module.exports = {
    view : (vnode) =>
        m("div", { class : vnode.state.show ? css.styles : css.stylesHide },
            m("button", {
                    class : css.show,
                    onclick : () => {
                        vnode.state.show = !vnode.state.show;
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

                        state.lyrics[state.selected].class = css[style];
                    }
                }, `Style ${idx}`)
            )
        )
};
