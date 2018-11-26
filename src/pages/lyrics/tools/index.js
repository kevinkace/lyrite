import state from "../../../state";

import css from "./index.css";

import colors from "./colors";
import fonts from "./fonts";

import quillSvg from "../../../icons/quill.svg";

// import createdByCurrentUser from "../../../lib/createdByCurrentUser";
// import forkOrLogin from "./forkOrLogin";

export default {
    view(vnode) {
        return m("div", { class : css.tools },

            // Show/hide tool button
            m("button", {
                    class : !state.toolsOpen ? css.showEdit : css.show,
                    onclick() {
                        state.action("TOGGLE_TOOLS");
                    }
                },
                m.trust(quillSvg),
                m("div", "tools")
            ),

            // Color buttons
            m("div", { class : css.setting },
                m("label", { class : css.label }, "colors "),
                m(colors)
            ),

            // Font choices
            m("div", { class : css.setting },
                m("label", { class : css.label }, "font "),
                m(fonts)
            ),

            // Column
            m("div", { class : css.setting },
                m("label", { class : css.label }, "cols "),

                m("div", { class : css.control },
                    m("button", {
                        class : css.dec,

                        onclick() {
                            if (state.cols.count === 1) {
                                return;
                            }

                            --state.cols.count;
                        }
                    }, "-"),

                    m("label", { class : css.cols }, state.cols.count),

                    m("button", {
                        class : css.inc,
                        onclick() {
                            ++state.cols.count;
                        }
                    }, "+")
                )
            )
        );
    }
};
