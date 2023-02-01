import m from "mithril";

import state from "../../state";

import css   from "./index.mcss";
import tools from "../tools";

import logo from "../icons/lyrite-logo2.svg?raw";

import animResolve from "../../lib/animResolve";

export default {
    oncreate : (vnode) => {
        state.header = {
            height : vnode.dom.offsetHeight
        };
    },
    onbeforeremove : (vnode) => animResolve(vnode.dom, css.headerOut),
    onremove       : () => {
        delete state.header;
    },
    view : () =>
        m("div", { class : css.headerIn },
            m("h1", { class : css.title }, state.song ? state.song.title : state.appName),

            m("div", { class : css.logo },
                m(m.route.Link, { href : "/" },
                    m.trust(logo),
                    m("div", "Lyrite")
                )
            ),

            state.song ? m(tools) : null
        )
};
