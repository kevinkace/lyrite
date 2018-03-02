import m from "mithril";

import state from "../state";

import css from "./title.css";

export default {
    view : (vnode) => [
        m("input", {
            value       : vnode.state.value,
            placeholder : state.song.title,
            class       : css.input,
            oninput     : m.withAttr("value", (v) => {
                vnode.state.value = v;
            }),
            oncreate : (inputVnode) => {
                inputVnode.dom.focus();
            }
        }),
        m("div", { class : css.buttons },
            m("button", {
                    class   : css.add,
                    onclick : () => {
                        if(!vnode.state.value) {
                            return;
                        }

                        state.action("ADD TITLE", vnode.state.value);
                    }
                },
                "add title"
            ),
            m("button", {
                    class   : css.cancel,
                    onclick : () => {
                        state.action("CLOSE MODAL");
                    }
                },
                "cancel"
            )
        )
    ]
};
