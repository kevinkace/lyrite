import state from "../../state";

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

                m("div", { class : css.control },
                    state.colors.map((color, idx) => {
                        let className = colorsCss[color];

                        if (!isNaN(state.selectedColor)) {
                            className = state.selectedColor === idx ?
                                colorsCss[`${color}Selected`] :
                                colorsCss[`${color}Unselected`];
                        }

                        return m("button", {
                            class : className,

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
                    // m("label", {
                    //     class : css.font,

                    //     onmouseover() {
                    //         vnode.state.range = Date.now();
                    //     },

                    //     onmouseout() {
                    //         let now = Date.now();

                    //         setTimeout(() => {
                    //             if (now < vnode.state.range) {
                    //                 return;
                    //             }

                    //             vnode.state.range = false;

                    //             m.redraw();
                    //         }, 300);
                    //     }
                    // }, parseFloat(state.font.size, 10).toFixed(2)),

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
