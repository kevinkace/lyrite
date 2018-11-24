import state from "../../state";

import css from "./index.css";
import cssJoin from "cssJoin";
import tools from "../../components/tools";

import marked from "marked";
import loading from "../../components/loading";
import Scroll from "../../components/scroll/Scroll.js";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

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
                        _loading ?
                            m(loading, { text : true }) :
                            state.song.parsedLyrics.map((part, idx) =>
                                m("p", {
                                        id    : part.hash,
                                        class : [
                                            state.selected === idx ? css.lineSelected : css.line,
                                            part.style ? css[`s${part.style.idx}`] : null
                                        ].join(" "),

                                        onclick() {
                                            state.action("CLICK_LYRIC", idx);
                                        }
                                    },

                                    m.trust(marked(addBr(part.text)))
                                )
                            )
                    )
                )
            ),

            m("div", { class : state.toolsOpen ? css.toolsEdit : css.tools },
                m(tools)
            )
        );
    }
};
