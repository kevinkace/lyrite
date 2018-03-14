import m from "mithril";

import state from "../../state";

import css from "./index.css";
import header from "../header";
import modal from "../modal";

import ghLogo from "../icons/github.svg";

export default {
    view : (vnode) =>
        m("div",
            vnode.attrs.header ? m(header) : null,
            vnode.children,
            m("a", {
                    href : state.githubHref,
                    class : css.github
                },
                m.trust(ghLogo)
            ),

            state.modal ?
                m(modal) :
                null
        )
};
