"use strict";

const m = require("mithril");

const css = require("./index.css");
const state = require("../state");

function addBr(text) {
    return text.replace(/\n/g, "<br>")
}

module.exports = {
    view : () =>
        m("div", { class : css.lyrics },
            state.song.lyrics
                .map((part, idx) =>
                    m("p", {
                            id    : part.hash,
                            class : [
                                state.selected === idx ?
                                    css.selected :
                                    "",
                                css.line,
                                css[`s${part.styleIdx}`]
                            ].join(" "),

                            onclick : () => {
                                state.action("CLICK LYRIC", idx);
                                // state.selected = state.selected === idx ? false : idx;
                            }
                        },

                        m.trust(addBr(part.text))
                    )
                )
        )
};
