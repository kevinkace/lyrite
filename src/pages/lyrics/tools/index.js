import state from "../../../state";

import css from "./index.css";

import colors from "./colors";
import fonts from "./fonts";

import quillSvg from "../../../icons/quill.svg";
import minusSvg from "../../../icons/minus.svg";
import plusSvg from "../../../icons/plus.svg";
import State from "../../../state";

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
                m("label", { class : css.label }, "columns"),

                m("div", { class : css.columns },
                    m("button", {
                        class : css.colCount,

                        onclick() {
                            state.action("DEC_COLS");
                        }
                    }, m.trust(minusSvg)),

                    m("label", { class : css.colsLabel }, state.cols),

                    m("button", {
                        class : css.colCount,
                        onclick() {
                            state.action("INC_COLS");
                        }
                    }, m.trust(plusSvg))
                )
            )
        );
    }
};
