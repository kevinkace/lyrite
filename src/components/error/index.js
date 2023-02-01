import m from "mithril";

import state from "../../state";

import css from "./index.mcss";

export default {
    view : () =>
        m("div", { class : css.error },
            m("h1", state.error),

            m(m.route.Link, {
                class : css.home,
                href  : "/"
            }, "return to home")
        )
};
