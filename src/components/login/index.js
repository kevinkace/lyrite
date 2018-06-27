import m from "mithril";

import state from "../../state";

import css from "./index.css";

export default {
    view() {
        return m("button", {
                class : css.login,

                onclick : () => { state.action("OPEN LOGIN MODAL"); }
            },
            "login"
        );
    }
};
