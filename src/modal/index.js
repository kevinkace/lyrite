import m from "mithril";

import state from "../state";
import animResolve from "../lib/animResolve";

import css from "./index.css";

export default {
    onbeforeremove : (vnode) => animResolve(vnode.dom, css.modalOut),
    view : (vnode) =>
        m("div", {
                class : css.modalIn
            },
            m("div", { class : css.content },
                vnode.children,
                m("div", {
                    class : css.close,
                    onclick : () => {
                        state.action("CLOSE MODAL");
                    }
                }, "🗙")
            )
        )
};
