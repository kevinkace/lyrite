"use strict";

const m = require("mithril");

const css = require("./index.css");

const state = require("./state");

module.exports = {
    view : () =>
        m("div", { class : css.styles },
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
