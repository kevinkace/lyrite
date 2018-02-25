import m from "mithril";

import state from "../state";

import css from "./index.css";
import icons from "../icons";
import header from "../header";
import modal from "../modal";

export default {
    view : (vnode) =>
        m("div",
            vnode.attrs.header ? m(header) : null,
            vnode.children,
            m("a", {
                    href : state.githubHref,
                    class : css.github
                },
                m(icons, { icon : "github" })
            ),

            state.modal ?
                m(modal) :
                null
        )
};
