"use strict";

const styles = [ "s0", "s1", "s2" ];

const lyrics = require("./lyrics");
const css = require("./index.css");

const m = require("mithril");

function addBr(text) {
    return text.replace(/\n/g, "<br>")
}

m.mount(document.getElementById("mount"), {
    oninit : (vnode) => {
        vnode.state.lyrics = lyrics || [];
    },
    view : (vnode) => [
        m("div", { class : css.lyrics },
            lyrics
            .map((part, idx) =>
                m("p", {
                        class : [
                                vnode.state.selected === idx ?
                                    css.selected :
                                    "",
                                css.line,
                                part.hash,
                                part.class || ""
                            ].join(" "),

                        onclick : () => {
                            vnode.state.selected = vnode.state.selected === idx ? false : idx;
                        }
                    },

                    m.trust(addBr(part.text))
                )
            )
        ),

        m("div", { class : css.styles },
            styles.map((style, idx) =>
                m("button", {
                    class : css[style],

                    onclick : () => {
                        if(isNaN(vnode.state.selected)) {
                            return;
                        }

                        vnode.state.lyrics[vnode.state.selected].class = css[style];
                    }
                }, `Style ${idx}`)
            )
        )
    ]
});
