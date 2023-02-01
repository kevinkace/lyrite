import m  from "mithril";
import ar from "animation-resolve";

import state from "../../state";

import css   from "./index.mcss";
import title from "./title";

const modals   = { title };
const hasClose = [];

export default {
    onbeforeremove(vnode) {
        return Promise.all([
            ar(vnode.dom, css.modalOut),
            ar(vnode.state.contentDom, css.contentOut)
        ]);
    },
    view(vnode) {
        return m("div", { class : css.modalIn },
            m("div", {
                    class : css.contentIn,

                    oncreate({ dom }) {
                        vnode.state.contentDom = dom;
                    }
                },

                m(modals[state.modal]),

                hasClose.indexOf(state.modal) > -1 ?
                    m("button", {
                        class : css.close,

                        onclick() {
                            state.action("CLOSE MODAL");
                        }
                    }, "🗙") :
                    null
            )
        );
    }
};
