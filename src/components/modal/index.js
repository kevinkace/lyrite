import state from "../../state";
import animResolve from "animation-resolve";

import css from "./index.css";
import login from "./login";
import username from "./username";
import usernameSuccess from "./usernameSuccess";
import fork from "./fork";

const modals = { login, username, usernameSuccess, fork };

function escHandler(e) {
    if (e.keyCode === 27) {
        state.action("CLOSE_MODAL");
    }
}

export default {
    onbeforeremove(vnode) {
        window.removeEventListener("keydown", escHandler);

        return Promise.all([
            animResolve(vnode.dom, css.modalOut),
            animResolve(vnode.state.contentVnode.dom, css.contentOut)
        ]);
    },
    view(vnode) {
        const modal = modals[state.modal];

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
