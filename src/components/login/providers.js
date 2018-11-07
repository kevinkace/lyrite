import state from "../../state";

import cssJoin from "cssJoin";
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
                        class : cssJoin(
                            css[p.name]
                            // [ style === "icon", css.icon ],
                            // [ state.provider === p.name, css.curProvider ],
                            // [ state.provider && state.provider !== p.name, css.otherProvider ]
                        ),
                        onclick() {
                            state.action("LOGIN", p.provName, p.name).then(m.redraw);
                        }
                    },
                    m.trust(p.logo),
                    m("span", p.name)
                )
            )
        ];
    }
}