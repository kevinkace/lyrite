import m from "mithril";

import state from "../state";

import css from "./index.css";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

export default {
    view : () =>
        m("div", {
                class : css.lyrics,
                style : {
                    fontSize : `${state.font.size}em`,
                    columnCount : state.cols.count
                }
            },
            state.song.lyrics
                .map((part, idx) =>
                    m("p", {
                            id    : part.hash,
                            class : [
                                state.selected === idx ? css.lineSelected : css.line,
                                part.style ? css[`s${part.style.idx}`] : null
                            ].join(" "),

                            onclick : () => {
                                state.action("CLICK LYRIC", idx);
                            }
                        },

                        m.trust(addBr(part.text))
                    )
                )
        )
};
