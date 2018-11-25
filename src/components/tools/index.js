import state from "../../state";

import cssJoin from "cssJoin";
import css from "./index.css";
import colorsCss from "./colors.css";
import tooltipCss from "./tooltip.css";

import quillSvg from "../../icons/quill.svg";
import fontSizeUpSvg from "../../icons/font-sizeUp.svg";
import fontSizeDownSvg from "../../icons/font-sizeDown.svg";

import createdByCurrentUser from "../../lib/createdByCurrentUser";
import forkOrLogin from "./forkOrLogin";

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

                m("div", { class : css.colors },
                    state.colors.map((color, idx) => {
                        let className;

                        if (!isNaN(state.selectedColor)) {
                            className = state.selectedColor === idx ?
                                colorsCss.selected :
                                colorsCss.unselected;
                        }

                        return m("button", {
                            class : cssJoin(
                                css.color,
                                colorsCss[color],
                                [ className, className ]
                            ),

                            onclick() {
                                state.action("CLICK_COLOR", idx);
                            }
                        }, idx)
                    })
                )
            ),

            // Font choices
            m("div", { class : css.setting },
                m("label", { class : css.label }, "font "),

                m("div", { class : css.control },

                    m("button", {
                            class : css.fontSize,
                            onclick(e) {
                                state.action("DEC_FONT_SIZE");
                            }
                        },
                        m.trust(fontSizeDownSvg)
                    ),

                    m("button", {
                            class : css.fontSize,
                            onclick(e) {
                                state.action("INC_FONT_SIZE");
                            }
                        },
                        m.trust(fontSizeUpSvg)
                    )


                )
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
            ),

            // Style tooltip
            state.style ?
                m("div", {
                    class : tooltipCss[`s${state.style.idx}`],
                    style : state.tooltip.style
                }) :
                null

        );
    }
};
