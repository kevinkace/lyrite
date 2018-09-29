import state from "../../state";

import css from "./title.css";

export default {
    view(vnode) {
        return m("form", {
                onsubmit(e) {
                    e.preventDefault();

                    if (!vnode.state.value) {
                        return;
                    }

                    state.action("ADD_TITLE_MODAL", vnode.state.value);
                }
            },
            m("input", {
                value       : vnode.state.value,
                placeholder : state.song.title,
                class       : css.input,
                oninput     : m.withAttr("value", (v) => {
                    vnode.state.value = v;
                }),
                oncreate(inputVnode) {
                    inputVnode.dom.focus();
                }
            }),
            m("div", { class : css.buttons },
                m("button", {
                        type  : "submit",
                        class : css.add
                    },
                    "add title"
                ),
                m("button", {
                        class : css.cancel,
                        onclick(e) {
                            e.preventDefault();

                            state.action("CLOSE_MODAL");
                        }
                    },
                    "cancel"
                )
            )
        );
    }
};
