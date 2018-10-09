import state from "../../state";

import css from "./index.css";
import header from "../header";
import modal from "../modal";
import login from "../login";
import logout from "../logout";

import ghLogo from "../../icons/github-black.svg";
import animResolve from "animation-resolve";

export default {
    view(vnode) {
        return m("div",

            m("div", { class : css.login },
                state.loggedIn ?
                    m(logout) :
                    m(login)
            ),

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
                    Object.keys(state.deleted).map(id =>
                        m("div", {
                                key   : id,
                                class : css.notificationIn,

                                onbeforeremove(notiVnode) {
                                    return animResolve(notiVnode.dom, css.notificationOut);
                                }
                            },

                            "deleted song! ",
                            m("span", { class : css.songTitle }, state.deleted[id].song.data.title),

                            m("button", {
                                onclick() {
                                    state.action("UNDO_DELETE_SONG_BY_ID", id);
                                }
                            }, "undo")
                        )
                    )
                ) :
                null
        );
    }
};
