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
    view : () =>
        m("div",
            m("button", "contributors"),
            m("div", { class : css.content },
                contributors.map((c) =>
                    m("div", { class : css.contributor },
                        m(c.href ? "a" : "div", {
                            href : c.href
                        }, c.name),
                        c.desc
                    )
                )
            )
        )
};
