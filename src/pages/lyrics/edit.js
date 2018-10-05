import { get } from "object-path";

import state from "../../state";

import css from "./edit.css";
import animResolve from "animation-resolve";

function update(vnode) {
    vnode.state.lyrics = get(state.song.data.lyrics);
}

export default {
    oninit(vnode) {
        update(vnode);
    },
    onbeforeupdate(vnode) {
        update(vnode);
    },
    onbeforeremove(vnode) {
        return animResolve(vnode.dom, css.editOut);
    },
    view(vnode) {
        return m("div", { class : css.editIn },
            m("textarea", {
                class   : css.textarea,
                value   : vnode.state.lyrics,
                oninput : m.withAttr("value", (v) => {
                    vnode.state.lyrics = v;
                    state.action("UPDATE_PARSED_LYRICS", v);
                })
            })
        );
    }
};
