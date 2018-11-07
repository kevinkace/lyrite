import state from "../../state";

import css from "./forkOrLogin.css";

export default {
    view() {
        return state.session.loggedIn ?
            m("button", {
                    class : css.fork,
                    onclick() {
                        state.action("FORK_MODAL");
                    }
                },
                "fork"
            ) :
            m("button", {
                class : css.fork,
                onclick() {
                    state.action("OPEN_LOGIN_MODAL");
                }
            }, "login");
    }
};
