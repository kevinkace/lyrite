import state from "../../state";

import css from "./login.css";
import providers from "../login/providers";
import username from "./username";

export default {
    close : true,
    view() {
        return m("div", { class : css.login },

            m("div", { class : !state.username ? css.step1Active : css.step1 },
                m("div", { class : css.number }, "01"),
                m("div", { class : css.username },
                    m(username)
                )
            ),

            m("hr"),

            m("div", { class : state.username ? css.step2Active : css.step2 },
                m("div", { class : css.number }, "02"),
                m("div",
                    m("p", "Sign with provider"),
                    m("div", { class : css.providers },
                        m(providers, { style : state.username ? "full" : "icon" })
                    )
                )
            )
        );
    }
};
