import state from "../../state";
import animResolve from "animation-resolve";

import css from "./index.css";
import login from "./login";
import fork from "./fork";
import loginError from "./loginError";

const modals = { login, fork, loginError };

function escHandler(e) {
    if (e.keyCode === 27) {
        state.action("CLOSE_MODAL");
    }
}

export default {
    oninit(vnode) {
        vnode.state.modal = modals[state.modal];
    },
    onbeforeremove(vnode) {
        window.removeEventListener("keydown", escHandler);

        return Promise.all([
            vnode.state.modal.close ?
                vnode.state.modal.close() :
                Promise.resolve(),
            animResolve(vnode.dom, css.modalOut),
            animResolve(vnode.state.contentVnode.dom, css.contentOut)
        ]);
    },
    view(vnode) {
        const { modal } = vnode.state;

        return m("div", {
                class : css.modalIn,
                onclick(e) {
                    if (e.target !== e.currentTarget || modal.manditory) {
                        return;
                    }

                    state.action("CLOSE_MODAL");
                }
            },
            m("div", {
                    class : css.contentIn,
                    oncreate(contentVnode) {
                        vnode.state.contentVnode = contentVnode;
                        window.addEventListener("keydown", escHandler);
                    }
                },

                m(modal),

                modal.close ?
                    m("button", {
                        class : css.close,
                        onclick() {
                            state.action("CLOSE_MODAL");
                        }
                    }, "🗙") :
                    null
            )
        );
    }
};
