import state from "../../state";

import css from "./providers.css";
import twitter from "../../icons/twitter.svg";
import facebook from "../../icons/facebook.svg";
import github from "../../icons/github.svg";

const providers = [{
        name     : "twitter",
        provName : "TwitterAuthProvider",
        logo     : twitter
    }, {
        name     : "github",
        provName : "GithubAuthProvider",
        logo     : github
    }, {
        name     : "facebook",
        provName : "FacebookAuthProvider",
        logo     : facebook
}];

export default {
    view(vnode) {
        const { style, tabindex = 1 } = vnode.attrs;

        return [
            providers.map(p =>
                m("button", {
                        tabindex,
                        class : css[p.name],
                        onclick() {
                            state.action("AUTH_WITH_PROVIDER", p.provName, p.name).finally(m.redraw);
                        }
                    },
                    m.trust(p.logo),
                    m("span", p.name)
                )
            )
        ];
    }
}