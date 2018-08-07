import m from "mithril";

import css from "./login.css";
import providers from "../login/providers";

export default {
    view() {
        return m("div", { class : css.login },
            m("p", "Sign in options"),

            m(providers)
        );
    }
};
