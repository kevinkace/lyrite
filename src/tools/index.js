"use strict";

const m = require("mithril");

const icons = require("../icons.svg");
const css = require("./index.css");
const tooltipCss = require("./tooltip.css");

const state = require("../state");

module.exports = {
    view : (vnode) =>
        m("div", { class : vnode.state.show ? css.tools : css.toolsHide },

            // Show/hide tool button
            m("button", {
                    class : css.show,
                    onclick : () => {
                        vnode.state.show = !vnode.state.show;

                        if(!vnode.state.show) {
                            state.action("HIDE TOOLS");
                        }
                    }
                },
                m("svg",
                    m("use", {
                        "xlink:href" : `${icons}#icon-quill`
                    })
                )
            ),

            // Style buttons
            m("div", { class : css.setting },
                m("label", { class : css.label }, "styles "),
                m("div", { class : css.buttons },
                    state.styles.map((style, idx) =>
                        m("button", {
                            class : state.style && state.style.idx === idx ? css[`${style}Selected`] : css[style],

                            onclick : () => {
                                state.action("CLICK STYLE", idx);
                            }
                        }, `${idx}`)
                    )
                )
            ),

            // Font choices
            m("div", { class : css.setting },
                m("label", { class : css.label }, "font "),
                m("div", { class : css.control },
                    m("input", {
                        type  : "range",
                        min   : 0.5,
                        max   : 3,
                        step  : 0.1,

                        value : state.font.size,
                        oninput : m.withAttr("value", (v) => { state.font.size = v; })
                    })
                )
            ),

            // Style tooltip
            state.style ?
                m("div", {
                    class : tooltipCss[`s${state.style.idx}`],
                    style : state.tooltip.style
                }) :
                null
        )
};
