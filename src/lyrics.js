"use strict";

const m = require("mithril");

const css = require("./index.css");
const state = require("./state");

function addBr(text) {
    return text.replace(/\n/g, "<br>")
}

module.exports = {
    view : (vnode) =>
        m("div", { class : css.lyrics },
            state.lyrics
            .map((part, idx) =>
                m("p", {
                        class : [
                            state.selected === idx ?
                                css.selected :
                                "",
                            css.line,
                            part.hash,
                            part.class || ""
                        ].join(" "),

                        onclick : () => {
                            state.selected = state.selected === idx ? false : idx;
                        }
                    },

                    m.trust(addBr(part.text))
                )
            )
        )
};
