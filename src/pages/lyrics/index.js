import state from "../../state";

import css from "./index.css";
import cssJoin from "cssJoin";
import edit from "./edit";
import tools from "../../components/tools";

import marked from "marked";
import loading from "../../components/loading";

function addBr(text) {
    return text.replace(/\n/g, "<br>");
}

class Scroll {
    constructor() {
        this.init = true;
        // this.barHeight = 1;
        // this.barTop = 0;
        // this.scrollTop = 0;
        this.heightDelta = 0;
        this.heightRatio = 1;
        this.scrollAmt = 0;

        // this.content // height of content dom
        // this.scroll // height of scroll dom
        this.scrollListener = this.scroll.bind(this);

        document.addEventListener("wheel", this.scrollListener);
        window.scroll = this;
    }

    destructor() {
        document.removeEventListener("wheel", this.scrollListener);
    }

    reset() {
        // this.barHeight = 1;
        // this.barTop = 0;
        // this.scrollTop = 0;
        this.heightRatio = 1;
    }

    createDom(key, dom) {
        this.key = dom.getBoundingClientRect().height;

        this.updateBarHeight();
    }

    updateDom(key, dom) {
        const oldVal = this[key];

        this[key] = dom.getBoundingClientRect().height;

        if (oldVal !== this[key]) {
            this.updateBarHeight();
        } else {
            console.log("same");
        }
    }

    updateBarHeight() {
        if (!this.content || !this.scroll) {
            return;
        }

        this.heightDelta = this.content - this.scroll;
        this.heightRatio = this.scroll / this.content;

        console.log("heightDelta", this.heightDelta);
        console.log("heightRatio", this.heightRatio);

        m.redraw();
    }

    scroll(e) {
        const change = parseInt(e.deltaY, 10) / 5;

        if (this.heightDelta < 0) {
            this.scrollAmt = 0;

        }

        this.scrollAmt += change;

        if (this.scrollAmt < 0) {
            this.scrollAmt = 0;
        }

        if (this.scrollAmt > this.heightDelta) {
            this.scrollAmt = this.heightDelta;
        }

        m.redraw();
    }
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
                m("div", { style : { position  : "absolute", color : "#f00" } },
                    vnode.state.scroll.scrollAmt
                ),
                m("div", {
                    class : css.bar,
                    style : {
                        height  : `${vnode.state.scroll.heightRatio * 100}%`,
                        opacity : vnode.state.scroll.heightDelta <= 0 ? 0 : 1
                    }
                    // "data-attrs" : JSON.stringify(vnode.state.scroll.style)
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
