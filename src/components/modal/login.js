import state from "../../state";

import cssJoin from "cssJoin";
import css from "./login.css";
import providers from "../login/providers";
import usernameC from "../login/username";
import loading from "../loading";
import twitterSvg from "../../icons/twitter.svg";
import githubSvg from "../../icons/github.svg";
import facebookSvg from "../../icons/facebook.svg";

// ## login/account creation steps
// 1 - not authed, {}
// 2 - authorizing, { authorizing }
// 3a - auth failed -> 1 { authFailed }
// 3b - authed, no username { authed }
// 3c - authed, w/ username DONE { authed, username }
// 4 - usernaming { authed, usernaming }
// 5a - usernamed DONE (3c) { authed, username }
// 5b - username failed -> 3b { authed, usernameFailed }

const providerIcons = {
    twitter  : twitterSvg,
    github   : githubSvg,
    facebook : facebookSvg
};

export default {
    close() {
        return !state.session.loggedIn ? state.action("LOGOUT") : null;
    },
    onupdate() {
        if (state.session.loggedIn) {
            setTimeout(() => {
                state.action("CLOSE_MODAL");
            }, 1000);
        }
    },
    view() {
        const {
            authorized,
            authorizing,
            authFailed,
            username,
            usernaming,
            usernameFailed,
            tryingName,
            provider,
            loggedIn
        } = state.session;

        return m("div", { class : css.login },

            m("label", {
                tabindex : 1,
                oncreate(labelVnode) {
                    labelVnode.dom.focus();
                }
            }),

            !authorized && !authorizing ?
                m("div", { class : css.step },
                    authFailed ?
                        m("p", "Authorizing failed, try again") :
                        m("p", "Sign in with provider"),
                    m("div", { class : css.providers },
                        m(providers, { tabindex : 2 })
                    )
                ) :
                null,

            authorizing ?
                m("div", { class : css.step },
                    m("p", `Signing in with ${provider}`),
                    m(loading, { valign : "bottom" })
                ) :
                null,

            authorized && !username ?
                m("div", { class : css.step },
                    usernameFailed ?
                        m("p", `"${tryingName}" is unavailable, try again`) :
                        [
                            m("p", { class : cssJoin(css.signedIn, css[provider]) },
                                m.trust(providerIcons[provider]),
                                " signed in!"
                            ),
                            m("p", "Choose a username")
                        ],
                    m(usernameC, { tabindex : 3 })
                    // m("p", { class : css.logout },
                    //     "or ",
                    //     m("button", {
                    //         onclick() {
                    //             state.action("LOGOUT");
                    //         }
                    //     }, "logout")
                    // )
                ) :
                null,

            usernaming ?
                m("div", { class : css.step },
                    m("p", `Trying username ${tryingName}`),
                    m(loading, { valign : "bottom" })
                ) :
                null,

            loggedIn ? m("div", "Logged in!") : null
        );
    }
};
