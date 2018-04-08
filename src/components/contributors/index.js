import m from "mithril";

import css from "./index.css";

const contributors = [{
    name : "Kevin Cameron",
    desc : "creator & dev",
    href : "http://kevinkace.com"
}, {
    name : "Neil Hagar",
    desc : "ideas"
}, {
    name : "Eli Scheer",
    desc : "logo"
}];

export default {
    view : (vnode) =>
        m("div", { class : css.contributors },
            m("div", { class : vnode.state.show ? css.slideIn : css.slideOut },
                m("button", {
                        onclick : () => {
                            vnode.state.show = !vnode.state.show;
                        }
                    },
                    "contributors"
                ),
                m("div", { class : css.content },
                    contributors.map((c) =>
                        m("div", { class : css.contributor },
                            m(c.href ? "a" : "div", {
                                class :  css.name,
                                href : c.href
                            }, c.name),
                            c.desc
                        )
                    )
                )
            )
        )
};
