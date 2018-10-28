import State from "../../state";

import css from "./usernameSuccess.css";
import check from "../../icons/check.svg";

const TIMEOUT = 1500;

export default {
    close : true,
    oncreate() {
        setTimeout(() => {
            State.action("CLOSE_MODAL");
        }, TIMEOUT);
    },
    view() {
        return m("div", { class : css.usernameSuccess },
            m.trust(check),
            "username successfully added!"
        );
    }
};
