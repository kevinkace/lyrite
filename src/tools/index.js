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
                m("div", { class : css.control },
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
                    m("label", { class : css.font }, parseFloat(state.font.size, 10).toFixed(2)),
                    m("input", {
                        type  : "range",
                        min   : 0.9,
                        max   : 2,
                        step  : 0.05,

                        class : css.range,

                        value : state.font.size,
                        oninput : m.withAttr("value", (v) => { state.font.size = v; })
                    })
                )
            ),

            // Column
            m("div", { class : css.setting },
                m("label", { class : css.label }, "columns "),
                m("div", { class : css.control },
                    m("button", {
                        class : css.dec,
                        onclick : (e) => {
                            if(state.cols.count === 1) {
                                return;
                            }

                            --state.cols.count;
                        }
                    }, "<"),
                    m("label", { class : css.cols }, state.cols.count),
                    m("button", {
                        class : css.inc,
                        onclick : (e) => {
                            ++state.cols.count;
                        }
                    }, ">")

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
