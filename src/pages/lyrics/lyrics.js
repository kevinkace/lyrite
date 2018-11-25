import state from "../../state";

import cssJoin from "cssJoin";
import marked from "marked";

import css from "./lyrics.css";
import loading from "../../components/loading";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

function isntNaN(val) {
    return !isNaN(val);
}

export default {
    view() {
        const { loading : _loading } = state.song;

        return _loading ?

            m(loading, { text : true }) :

            state.song.parsedLyrics.map((lyric, idx) => {
                const color = state.song.colorsByHash[lyric.hash]
                const hasColor = isntNaN(color);

                return m("div", {
                        id    : lyric.hash,
                        class : hasColor ? css[`s${color}`] : css.line,

                        onclick() {
                            state.action("CLICK_LYRIC", idx);
                        }
                    },

                    m.trust(marked(addBr(lyric.text)))
                );
            });
    }
};
