import m from "mithril";
import { get } from "object-path";

import state from "../../state";

import css from "./index.css";
import header from "../header";
import modal from "../modal";

import ghLogo from "../../icons/github.svg";

export default {
    view : (vnode) =>
        m("div",
            vnode.attrs.header ? m(header) : null,

            vnode.children,

            state.debug ? [
                    m("button", {
                        class   : css.clear,
                        onclick : () => {
                            state.action("CLEAR DB");

                        }
                    }, "clear"),

                    m("pre", { class : css.debug }, JSON.stringify(state, null, 2))
                ] :
                null,

            m("div", { class : css.bug },
                m("a", {
                    href  : state.githubHref,
                    class : css.github
                }, m.trust(ghLogo)),

                m("div", {
                    class : css.ver
                }, state.ver.tag)
            ),

            state.modal ? m(modal) : null,

            state.deleted ?
                m("div", { class : css.notifications },
                    Object.keys(state.deleted).map((id) =>
                        m("div", { class : css.notification },
                            `deleted ${id}`,
                            m("button", {
                                onclick : () => {
                                    state.action("UNDO DELETE SONG BY ID", id);
                                }
                            }, "undo")
                        )
                    )
                ) :
                null
        )
};
