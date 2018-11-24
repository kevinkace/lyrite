import state from "../../state";

import cssJoin from "cssJoin";
import css from "./index.css";
import lyrics from "./lyrics";
// todo: move to ./pages/lyrics
import tools from "../../components/tools";

import Scroll from "../../components/scroll/Scroll.js";

let scroll;

export default {
    oninit(vnode) {
        state.action("OPEN_TOOLS");
        scroll = new Scroll();
    },
    onremove(vnode) {
        scroll.destructor();
    },
    view(vnode) {
        const { barHeight, heightDelta, barAmt } = scroll;
        const isSelectedColor = !isNaN(state.selectedColor);

        return m("div", { class : css.lyredit },
            m("div", {
                    class : state.toolsOpen ? css.scrollEdit : css.scroll,
                    style : {
                    },
                    oncreate({ dom }) {
                        scroll.createDom("scroll", dom);
                    },
                    onupdate({ dom }) {
                        scroll.updateDom("scroll", dom);
                    }
                },
                m("div", {
                    class : css.bar,
                    style : {
                        height    : barHeight ? `${barHeight}px` : 0,
                        transform : `translateY(${barAmt}px)`,
                        opacity   : heightDelta <= 0 ? 0 : 1
                    }
                }),
                m("div", {
                        class : css.content,
                        style : {
                            transform : `translateY(-${scroll.scrollAmt}px)`
                        }
                    },
                    m("div", {
                            class : cssJoin(
                                [ state.toolsOpen, css.lyricsEdit, css.lyrics ],
                                [ isSelectedColor, css.crosshair ],
                                [ isSelectedColor, css[`s${state.selectedColor}Hover`] ]
                            ),
                            style : {
                                fontSize    : `${state.font.size}em`,
                                columnCount : state.cols.count
                            },
                            oncreate({ dom }) {
                                scroll.createDom("content", dom);
                                vnode.state.contentDom = dom;
                            },
                            onupdate({ dom }) {
                                if (vnode.state.contentScaling) {
                                    return;
                                }

                                scroll.updateDom("content", dom);
                            },
                            ontransitionstart(e) {
                                vnode.state.contentScaling = true;
                            },
                            ontransitionend(e) {
                                delete vnode.state.contentScaling;

                                scroll.updateDom("content", vnode.state.contentDom);
                            }
                        },

                        m(lyrics)
                    )
                )
            ),

            m("div", { class : state.toolsOpen ? css.toolsEdit : css.tools },
                m(tools)
            )
        );
    }
};
