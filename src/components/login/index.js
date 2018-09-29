import state from "../../state";

import css from "./index.css";

export default {
    view() {
        return m("button", {
                class : css.login,

                onclick() {
                    state.action("OPEN_LOGIN_MODAL");
                }
            },
            "sign in"
        );
    }
};
