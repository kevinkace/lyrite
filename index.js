"use strict";

m.mount(document.getElementById("mount"), {
    oninit : (vnode) => {
        vnode.state.lyrics = lyrics || [];
    },
    view : (vnode) =>
        lyrics
        .map((lineObj) =>
            Object.assign(lineObj, {
                text : lineObj.text.replace(/\n/g, "<br>")
            })
        )
        .map((lineObj, idx) =>
            m("p", {
                    class : [
                            vnode.state.selected === idx ? "selected" : "",
                            "line",
                            lineObj.hash
                        ].join(" "),

                    onclick : () => {
                        vnode.state.selected = vnode.state.selected === idx ? false : idx;
                    }
                },

                m.trust(lineObj.text)
            )
        )
});
