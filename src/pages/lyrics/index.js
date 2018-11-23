import state from "../../state";

import css from "./index.css";
import cssJoin from "cssJoin";
import edit from "./edit";
import tools from "../../components/tools";

import marked from "marked";
import loading from "../../components/loading";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

export default {
    oninit() {
        state.action("OPEN_TOOLS");
    },
    view() {
        const { loading : _loading } = state.song;

        return m("div", { class : css.lyredit },
            m("div", { class : state.toolsOpen ? css.scrollEdit : css.scroll },
                m("div", {
                        class : state.toolsOpen ? css.lyricsEdit : css.lyrics,
                        style : {
                            fontSize    : `${state.font.size}em`,
                            columnCount : state.cols.count
                        }
                    },
                    _loading ?
                        m(loading, { text : true }) :
                        state.song.parsedLyrics.map((part, idx) =>
                            m("p", {
                                    id    : part.hash,
                                    class : [
                                        state.selected === idx ? css.lineSelected : css.line,
                                        part.style ? css[`s${part.style.idx}`] : null
                                    ].join(" "),

                                    onclick() {
                                        state.action("CLICK_LYRIC", idx);
                                    }
                                },

                                m.trust(marked(addBr(part.text)))
                            )
                        )
                )
            ),

            m("div", { class : state.toolsOpen ? css.toolsEdit : css.tools },
                m(tools)
            )
        );
    }
};
