"use strict";

const styles = [ "s0", "s1", "s2" ];

function addBr(text) {
    return text.replace(/\n/g, "<br>")
}

m.mount(document.getElementById("mount"), {
    oninit : (vnode) => {
        vnode.state.lyrics = lyrics || [];
    },
    view : (vnode) => [
        m("div", { class : "lyrics" },
            lyrics
            .map((part, idx) =>
                m("p", {
                        class : [
                                vnode.state.selected === idx ? "selected" : "",
                                "line",
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

        m("div", { class : "styles" },
            styles.map((style, idx) =>
                m("button", {
                    class : style,

                    onclick : () => {
                        if(isNaN(vnode.state.selected)) {
                            return;
                        }

                        vnode.state.lyrics[vnode.state.selected].class = style;
                    }
                }, `Style ${idx}`)
            )
        )
    ]
});
