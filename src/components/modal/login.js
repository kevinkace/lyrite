import m from "mithril";

import state from "../../state";

import css from "./login.css";
import twitter from "../../icons/twitter.svg";
import facebook from "../../icons/facebook.svg";
import github from "../../icons/github.svg";

const providers = [{
        name     : "twitter",
        provName : "TwitterAuthProvider",
        logo     : twitter
    // }, {
    //     name     : "facebook",
    //     provName : "FacebookAuthProvider",
    //     logo     : facebook
    }, {
        name     : "github",
        provName : "GithubAuthProvider",
        logo     : github
}];

export default {
    view() {
        return m("div", { class : css.login },
            m("p", "Sign in options"),

            providers.map((p) =>
                m("button", {
                        class : css[p.name],

                        onclick : () => {
                            state.action("LOGIN", p.provName);
                        }
                    },
                    m.trust(p.logo),
                    " ",
                    p.name
                )
            )
        );
    }
};
