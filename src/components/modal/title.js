import m from "mithril";

import state from "../../state";

import css from "./title.mcss";

export default {
    view : (vnode) =>
        m("form", {
                onsubmit(e) {
                    e.preventDefault();

                    if (!vnode.state.value) {
                        return;
                    }

                    state.action("ADD TITLE MODAL", vnode.state.value);
                }
            },
            m("input", {
                value       : vnode.state.value,
                placeholder : state.song.title,
                class       : css.input,

                oninput(e) {
                    vnode.state.value = e.target.value;
                },
                oncreate({ dom }) {
                    dom.focus();
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

                            state.action("CLOSE MODAL");
                        }
                    },
                    "cancel"
                )
            )
        )
};
