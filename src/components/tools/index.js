import state from "../../state";

import css from "./index.css";
import tooltipCss from "./tooltip.css";

import edit from "../../icons/quill.svg";

export default {
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

            // Style buttons
            m("div", { class : css.setting },
                m("label", { class : css.label }, "styles "),
                m("div", { class : css.control },
                    state.styles.map((style, idx) =>
                        m("button", {
                            class : state.style && state.style.idx === idx ? css[`${style}Selected`] : css[style],

                            onclick() {
                                state.action("CLICK_STYLE", idx);
                            }
                        }, `${idx}`)
                    )
                )
            ),

            // Font choices
            m("div", { class : css.setting },
                m("label", { class : css.label }, "font "),
                m("div", { class : css.control },
                    m("label", {
                        class : css.font,
                        onmouseover() {
                            vnode.state.range = Date.now();
                        },
                        onmouseout() {
                            let now = Date.now();

                            setTimeout(() => {
                                if (now < vnode.state.range) {
                                    return;
                                }

                                vnode.state.range = false;

                                m.redraw();
                            }, 300);
                        }
                    }, parseFloat(state.font.size, 10).toFixed(2)),

                    m("input", {
                        type : "range",
                        min  : 0.7,
                        max  : 3,
                        step : 0.05,

                        class : vnode.state.range ? css.range : css.rangeHide,

                        onmouseover() {
                            vnode.state.range = Date.now();
                        },
                        onmouseout() {
                            let now = Date.now();

                            setTimeout(() => {
                                if (now < vnode.state.range) {
                                    return;
                                }

                                vnode.state.range = false;

                                m.redraw();
                            }, 300);
                        },

                        value   : state.font.size,
                        oninput : m.withAttr("value", (v) => { state.font.size = v; })
                    })
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

            m("div", { class : css.setting },
                m("label", { class : css.label }, m.trust("&nbsp;")), // I'm a terrible person
                m("div", { class : css.control },
                    m("button", {
                        class : css.edit,
                        onclick() {
                            state.action("TOGGLE_EDIT_CURRENT_SONG");
                        }
                    }, "edit")
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
