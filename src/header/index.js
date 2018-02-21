import m from "mithril";

import state from "../state";

import css from "./index.css";
import tools from "../tools";


export default {
    oncreate : (vnode) => {
        state.header = {
            height : vnode.dom.offsetHeight
        };
    },
    view : () =>
        m("div", { class : css.header },
            m("h1", { class : css.title }, state.song ? state.song.title : "Lyrite"),
            m("div", { class : css.logo },
                m("a", {
                    href : "/",
                    oncreate : m.route.link,
                }, "logo")
            ),
            state.song ? m(tools) : null
        )
};
