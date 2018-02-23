import m from "mithril";

import header from "../header";

export default {
    view : (vnode) =>
        m("div",
            vnode.attrs.header ? m(header) : null,
            vnode.children
        )
};
