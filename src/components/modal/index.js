import m from "mithril";

import state       from "../../state";
import animResolve from "../../lib/animResolve";

import css   from "./index.mcss";
import title from "./title";

const modals   = { title };
const hasClose = [];

export default {
    onbeforeremove : (vnode) => Promise.all([
        animResolve(vnode.dom, css.modalOut),
        animResolve(vnode.state.contentVnode.dom, css.contentOut)
    ]),
    view : (vnode) =>
        m("div", { class : css.modalIn },
            m("div", {
                    class    : css.contentIn,
                    oncreate : (contentVnode) => {
                        vnode.state.contentVnode = contentVnode;
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
