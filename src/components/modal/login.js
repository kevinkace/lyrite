import state from "../../state";

import cssJoin from "cssJoin";
import css from "./login.css";
import providers from "../login/providers";
import usernameC from "../login/username";
import loading from "../loading";
import twitterSvg from "../../icons/twitter.svg";
import githubSvg from "../../icons/github.svg";
import facebookSvg from "../../icons/facebook.svg";
import keySvg from "../../icons/key.svg";

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
            }, 2000);
        }
    },
    view() { // eslint-disable-line complexity
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
                oncreate({ dom }) {
                    dom.focus();
                }
            }),

            // 1, 3a - show auth providers
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

            // 2 - authorizing
            authorizing || (usernaming && !tryingName) ?
                m("div", { class : cssJoin(css.step, css.loading) },
                    m("p", `Signing in with ${provider}`),
                    m(loading, { valign : "bottom" })
                ) :
                null,

            // 3b, 5b - username field
            authorized && !username && !usernaming ?
                m("div", { class : css.step },
                    m("p", { class : cssJoin(css.signedIn, css[provider]) },
                        m.trust(providerIcons[provider]),
                        " signed in!"
                    ),

                    // no error
                    !usernameFailed ?
                        m("p", "Choose a username") :
                        null,

                    // error - username already taken
                    usernameFailed === "unique" ?
                        m("p",
                            m("span", { class : css.username }, tryingName),
                            " is unavailable, try something else"
                        ) :
                        null,

                    // error - prob firebase error
                    usernameFailed && usernameFailed !== "unique" ?
                        m("p", "Adding username failed, try again") :
                        null,

                    m(usernameC, { tabindex : 3 })
                ) :
                null,

            // 4 - usernaming
            usernaming && tryingName ?
                m("div", { class : cssJoin(css.step, css.loading) },
                    m("p", `Trying username ${tryingName}`),
                    m(loading, { valign : "bottom" })
                ) :
                null,

            // 3c, 5a - DONE
            loggedIn ?
                m("div", { class : css.loggedIn },
                    m.trust(keySvg),
                    m("p",
                        "Signed in as ",
                        m("div", { class : css.username }, username)
                    )
                ) :
                null
        );
    }
};
