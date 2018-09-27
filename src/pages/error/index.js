import state from "../../state";

import css from "./index.css";

export default {
    view : () =>
        m("div", { class : css.error },
            m("h1", state.error),

            m("a", {
                class    : css.home,
                href     : "/",
                oncreate : m.route.link
            }, "return to home")
        )
};
