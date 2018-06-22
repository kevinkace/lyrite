import m from "mithril";

import css from "./error.css";

export default {
    view(vnode) {
        const va = vnode.attrs;

        return va.show && va.errors ? m("div", { class : css.error }, va.errors.map((error) => error.label)) : null;
    }
}