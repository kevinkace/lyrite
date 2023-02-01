import m  from "mithril";
import ar from "animation-resolve";

import state from "../../state";

import css from "./edit.mcss";

export default {
    onbeforeremove({ dom }) {
        return ar(dom, css.editOut);
    },
    view() {
        return m("div", { class : css.editIn },
            m("textarea", {
                class : css.textarea,
                value : state.song.lyricString,

                oninput(e) {
                    state.song.lyricString = e.target.value;
                    state.action("UPDATE PARSED LYRICS");
                }
            })
        );
    }
};
