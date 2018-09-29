import { get } from "object-path";

import state from "../../state";

import css from "./edit.css";
import animResolve from "../../lib/animResolve";

export default {
    oninit(vnode) {
        vnode.state.lyrics = get(state.song.data.lyrics);
    },
    onbeforeupdate(vnode) {
        vnode.state.lyrics = get(state.song.data.lyrics);
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
