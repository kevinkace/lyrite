import state from "../../state";
import animResolve from "../../lib/animResolve";

import css from "./index.css";
import login from "./login";

const modals = { login };
const hasClose = [ "login" ];

function escHandler(e) {
    if(e.keyCode === 27) {
        state.action("CLOSE MODAL");
    }
}

export default {
    onbeforeremove : (vnode) => {
        window.removeEventListener("keydown", escHandler);
        return Promise.all([
            animResolve(vnode.dom, css.modalOut),
            animResolve(vnode.state.contentVnode.dom, css.contentOut)
        ]);
    },
    view : (vnode) =>
        m("div", {
                onclick : (e) => {
                    if(e.target !== e.currentTarget) {
                        return;
                    }

                    state.action("CLOSE MODAL");
                },
                class   : css.modalIn
            },
            m("div", {
                    class    : css.contentIn,
                    oncreate : (contentVnode) => {
                        vnode.state.contentVnode = contentVnode;
                        window.addEventListener("keydown", escHandler);
                    }
                },

                m(modals[state.modal]),

                hasClose.indexOf(state.modal) > -1 ?
                    m("button", {
                        class   : css.close,
                        onclick : () => {
                            state.action("CLOSE MODAL");
                        }
                    }, "🗙") :
                    null
            )
        )
};
