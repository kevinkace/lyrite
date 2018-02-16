"use strict";

const m = require("mithril");

const css = require("./index.css");

const icons = require("../icons.svg");

const state = require("../state");

module.exports = {
    view : () =>
        m("div", { class : css.styles },
            m("button",
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
            ),
            icons
        )
};
