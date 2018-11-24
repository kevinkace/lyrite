import state from "../../state";

import cssJoin from "cssJoin";
import marked from "marked";

import css from "./lyrics.css";
import loading from "../../components/loading";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

export default {
    view() {
        const { loading : _loading } = state.song;

        return _loading ?
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
    }
}