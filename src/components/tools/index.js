import state from "../../state";

import css from "./index.css";
import tooltipCss from "./tooltip.css";

import edit from "../../icons/quill.svg";
import fontSizeUp from "../../icons/font-sizeUp.svg";
import fontSizeDown from "../../icons/font-sizeDown.svg";
import createdByCurrentUser from "../../lib/createdByCurrentUser";
import forkOrLogin from "./forkOrLogin";

export default {
    oninit(vnode) {
        vnode.state.show = true;
    },
    view(vnode) {
        return m("div", { class : vnode.state.show ? css.tools : css.toolsHide },

            // Show/hide tool button
            m("button", {
                    class : css.show,
                    onclick() {
                        vnode.state.show = !vnode.state.show;

                        if (!vnode.state.show) {
                            state.action("HIDE_TOOLS");
                        }
                    }
                },
                m.trust(edit),
                m("div", "tools")
            ),

            // Color buttons
            m("div", { class : css.setting },
                m("label", { class : css.label }, "colors "),

                m("div", { class : css.control },
                    state.styles.map((style, idx) =>
                        m("button", {
                            class : state.style && state.style.idx === idx ? css[`${style}Selected`] : css[style],

                            onclick() {
                                state.action("CLICK_STYLE", idx);
                            }
                        }, idx)
                    )
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
                                state.action("INC_FONT_SIZE");
                            }
                        },
                        m.trust(fontSizeUp)
                    ),

                    m("button", {
                            class : css.fontSize,
                            onclick(e) {
                                state.action("INC_FONT_DOWN");
                            }
                        },
                        m.trust(fontSizeDown)
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
                    }, "<"),

                    m("label", { class : css.cols }, state.cols.count),

                    m("button", {
                        class : css.inc,
                        onclick() {
                            ++state.cols.count;
                        }
                    }, ">")
                )
            ),

            // edit lyrics
            // m("div", { class : css.setting },
            //     m("label", { class : css.label }, m.trust("&nbsp;")), // I'm a terrible person

            //     m("div", { class : css.control },
            //         m("button", {
            //             class : css.edit,

            //             onclick() {
            //                 state.action("TOGGLE_EDIT_CURRENT_SONG");
            //             }
            //         }, "edit")
            //     )
            // ),

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
