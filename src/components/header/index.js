import m  from "mithril";
import ar from "animation-resolve";

import state from "../../state";

import css   from "./index.mcss";
import tools from "../tools";

import logo from "../icons/lyrite-logo2.svg?raw";

export default {
    oncreate({ dom }) {
        state.header = {
            height : dom.offsetHeight
        };
    },
    onbeforeremove({ dom }) {
        return ar(dom, css.headerOut);
    },
    onremove() {
        delete state.header;
    },
    view() {
        return m("div", { class : css.headerIn },
            m("h1", { class : css.title }, state.song ? state.song.title : state.appName),

            m("div", { class : css.logo },
                m(m.route.Link, { href : "/" },
                    m.trust(logo),
                    m("div", "Lyrite")
                )
            ),

            state.song ? m(tools) : null
        );
    }
};
