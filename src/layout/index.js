import m from "mithril";

import state from "../state";
import icons from "../icons";

import header from "../header";

import css from "./index.css";

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
            )
        )
};
