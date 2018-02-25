import m from "mithril";

import state from "../state";

import css from "./edit.css";

export default {
    view : () =>
        m("div", { class : css.edit },
            m("textarea", {
                class : css.textarea,
                value : state.song.lyricString
            })
        )
};
