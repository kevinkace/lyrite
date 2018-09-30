import { get } from "object-path";

import state from "../../state";

import css from "./index.css";
import tools from "../tools";

import logo from "../../icons/lyrite-logo2.svg";

import animResolve from "../../lib/animResolve";

export default {
    oncreate(vnode) {
        state.header = {
            height : vnode.dom.offsetHeight
        };
    },
    onbeforeremove(vnode) {
        return animResolve(vnode.dom, css.headerOut);
    },
    onremove() {
        // todo: should be in an action
        delete state.header;
    },
    view() {
        return m("div", { class : css.headerIn },
            m("h1", { class : css.title }, get(state, [ "song", "data", "title" ])),

            m("div", { class : css.logo },
                m("a", {
                        href     : "/",
                        oncreate : m.route.link,
                    },
                    m.trust(logo),
                    m("div", "Lyrite")
                )
            ),

            state.song ? m(tools) : null
        );
    }
};
