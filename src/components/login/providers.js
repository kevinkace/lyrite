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
    view() {
        return providers.map((p) =>
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
        );
    }
}