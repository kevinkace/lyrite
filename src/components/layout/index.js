import m from "mithril";

import state from "../../state";

import css from "./index.css";
import header from "../header";
import modal from "../modal";
import login from "../login";

import ghLogo from "../../icons/github.svg";
import animResolve from "../../lib/animResolve";

export default {
    view : (vnode) =>
        m("div",

            !state.loggedIn ? m("div", { class : css.login }, m(login)) : null,

            vnode.attrs.header ? m(header) : null,

            vnode.children,

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
                        m("div", {
                                key   : id,
                                class : css.notificationIn,

                                onbeforeremove : (notiVnode) => animResolve(notiVnode.dom, css.notificationOut)
                            },

                            "deleted song! ",
                            m("span", { class : css.songTitle }, state.deleted[id].song.data.title),

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
