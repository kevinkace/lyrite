import state from "../../state";

import css from "./index.css";
import header from "../header";
import modal from "../modal";
import login from "../login";
import logout from "../logout";

import ghLogo from "../../icons/github.svg";
import animResolve from "animation-resolve";

const loadMsg = {
    oninit({ state : _state }) {
        _state.ellipses = [ ".", ".", "." ];
    },
    view({ state : _state, attrs }) {
        const { ellipses } = _state;
        const { text } = attrs;

        return m("div", { class : css.loadMsg },
            text,
            m("span",
                ellipses.map((ell, idx) => m("i", { class : css[`ell${idx}`] }, ell))
            )
        );
    }
}

export default {
    view(vnode) {
        const { header : _header, bug, login : _login } = vnode.attrs;
        const { loggedIn, loggingIn, loggingOut } = state.session;

        return m("div",

            _login ?
                m("div", { class : css.login },
                    loggedIn ?
                        m(logout) :
                        null,

                    loggingIn ?
                        m(loadMsg, { text : "logging in" }) :
                        null,

                    loggingOut ?
                        m(loadMsg, { text : "logging out" }) :
                        null,

                    !loggedIn && !loggingIn ?
                        // todo: remove logout
                        m(login) :
                        null
                ) :
                null,

            _header !== false ? m(header) : null,

            vnode.children,

            bug ?
                m("div", { class : css.bug },
                    m("a", {
                        href  : state.githubHref,
                        class : css.github
                    }, m.trust(ghLogo)),

                    m("div", { class : css.ver }, state.ver.tag)
                ) :
                null,

            state.modal ? m(modal) : null,

            state.deleted ?
                m("div", { class : css.notifications },
                    Object.keys(state.deleted).map(id =>
                        m("div", {
                                key   : id,
                                class : css.notificationIn,

                                onbeforeremove({ dom }) {
                                    return animResolve(dom, css.notificationOut);
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
