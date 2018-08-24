import m from "mithril";

import css from "./index.css";

export default {
    view(vnode) {
        const { tabs } = vnode.attrs;
        const { idx = 0 } = vnode.state;
        const content = vnode.children[idx];

        return m("div", { class : css.tabs },
            m("div", { class : css.buttons },
                tabs.map((tab, idx) =>
                    m("button", {
                        class   : vnode.state.idx === idx ? css.tabSelected : css.tab,
                        onclick : () => {
                            vnode.state.idx = idx;
                        }
                    }, tab)
                )
            ),
            m("div", { class : css.content }, content)
        );
    }
};
