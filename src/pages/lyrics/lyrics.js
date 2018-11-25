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
            state.song.parsedLyrics.map((lyric, idx) =>
                m("p", {
                        "data-color" : isNaN(state.song.colorsByHash[lyric.hash]) ? false : state.song.colorsByHash[lyric.hash],
                        id    : lyric.hash,
                        class : [
                            state.selected === idx ? css.lineSelected : css.line,
                            lyric.style ? css[`s${lyric.style.idx}`] : null
                        ].join(" "),

                        onclick() {
                            state.action("CLICK_LYRIC", idx);
                        }
                    },

                    m.trust(marked(addBr(lyric.text)))
                )
            );
    }
}