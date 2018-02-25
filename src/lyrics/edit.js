import m from "mithril";

import state from "../state";

import css from "./edit.css";

export default {
    view : () =>
        m("div", { class : css.edit },
            m("textarea", {
                class   : css.textarea,
                value   : state.song.lyricString,
                oninput : m.withAttr("value", (v) => {
                    state.song.lyricString = v;
                    state.action("UPDATE PARSED LYRICS");
                })
            })
        )
};
