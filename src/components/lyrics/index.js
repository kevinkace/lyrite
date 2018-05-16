import m from "mithril";

import state from "../../state";

import css from "./index.css";
import edit from "./edit";

import marked from "marked";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

export default {
    oninit : () => {
        // if(state.song.untitled) {
        //     state.action("OPEN TITLE MODAL");
        // }
    },
    view : () =>
        m("div", { class : css.lyredit },
            m("div", {
                    class : state.edit ? css.lyricsEdit : css.lyrics,
                    style : {
                        fontSize    : `${state.font.size}em`,
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

                            m.trust(marked(part.text))
                        )
                    )
            ),

            state.edit ? m(edit) : null
        )
};
