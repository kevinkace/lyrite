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

    onbeforeremove({ dom }) {
        return animResolve(dom, css.editOut);
    },

    view(vnode) {
        return m("div", { class : css.editIn },
            m("textarea", {
                class   : css.textarea,
                value   : vnode.state.lyrics,
                oninput : m.withAttr("value", (value) => {
                    vnode.state.lyrics = value;
                    state.action("UPDATE_PARSED_LYRICS", value);
                })
            })
        );
    }
};
