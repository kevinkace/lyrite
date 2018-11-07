import state from "../../state";

import css from "./index.css";

export default {
    view() {
        return m("button", {
                class : css.logout,
                onclick() {
                    state.action("LOGOUT").then(m.redraw);
                }
            },
            "logout"
        );
    }
};
