import css from "./index.css";

export default {
    oninit(vnode) {
        vnode.state.idx = 0;
    },
    view(vnode) {
        const { tabs } = vnode.attrs;
        const content = vnode.children[vnode.state.idx];

        return m("div", { class : css.tabs },
            m("div", { class : css.buttons },
                tabs.map((tab, idx) =>
                    m("button", {
                            class : vnode.state.idx === idx ?
                                css.tabSelected :
                                css.tab,
                            onclick() {
                                vnode.state.idx = idx;
                            }
                        },
                        typeof tab === "string" ?
                            tab :
                            [
                                m.trust(tab.icon),
                                tab.label
                            ]
                    )
                )
            ),
            m("div", { class : css.content }, content)
        );
    }
};
