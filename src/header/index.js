import m from "mithril";

import state from "../state";

import css from "./index.css";
import tools from "../tools";

import animResolve from "../lib/animResolve";

export default {
    oncreate : (vnode) => {
        state.header = {
            height : vnode.dom.offsetHeight
        };
    },
    onbeforeremove : (vnode) => animResolve(vnode.dom, css.headerOut),
    view : () =>
        m("div", { class : css.headerIn },
            m("h1", { class : css.title }, state.song ? state.song.title : state.appName),
            m("div", { class : css.logo },
                m("a", {
                    href : "/",
                    oncreate : m.route.link,
                }, "logo")
            ),
            state.song ? m(tools) : null
        )
};
