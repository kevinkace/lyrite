import state from "../../state";

import css from "./index.css";
import lyrics from "./lyrics";
// todo: move to ./pages/lyrics
import tools from "../../components/tools";

import Scroll from "../../components/scroll/Scroll.js";

export default {
    oninit(vnode) {
        state.action("OPEN_TOOLS");
        vnode.state.scroll = new Scroll();
    },
    onremove(vnode) {
        vnode.state.scroll.destructor();
    },
    view(vnode) {
        const { loading : _loading } = state.song;
        const { barHeight, heightDelta, barAmt } = vnode.state.scroll;

        return m("div", { class : css.lyredit },
            m("div", {
                    class : state.toolsOpen ? css.scrollEdit : css.scroll,
                    style : {
                    },
                    oncreate({ dom }) {
                        vnode.state.scroll.createDom("scroll", dom);
                    },
                    onupdate({ dom }) {
                        vnode.state.scroll.updateDom("scroll", dom);
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
                            transform : `translateY(-${vnode.state.scroll.scrollAmt}px)`
                        }
                    },
                    m("div", {
                            class : state.toolsOpen ? css.lyricsEdit : css.lyrics,
                            style : {
                                fontSize    : `${state.font.size}em`,
                                columnCount : state.cols.count
                            },
                            oncreate({ dom }) {
                                vnode.state.scroll.createDom("content", dom);
                                vnode.state.contentDom = dom;
                            },
                            onupdate({ dom }) {
                                if (vnode.state.contentScaling) {
                                    return;
                                }

                                vnode.state.scroll.updateDom("content", dom);
                            },
                            ontransitionstart(e) {
                                vnode.state.contentScaling = true;
                            },
                            ontransitionend(e) {
                                delete vnode.state.contentScaling;

                                vnode.state.scroll.updateDom("content", vnode.state.contentDom);
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
