import m from "mithril";

import state from "../../state";

import css         from "./edit.mcss";
import animResolve from "../../lib/animResolve";

export default {
    onbeforeremove : (vnode) =>
        animResolve(vnode.dom, css.editOut),
    view : () =>
        m("div", { class : css.editIn },
            m("textarea", {
                class : css.textarea,
                value : state.song.lyricString,

                oninput(e) {
                    state.song.lyricString = e.target.value;
                    state.action("UPDATE PARSED LYRICS");
                }
            })
        )
};
