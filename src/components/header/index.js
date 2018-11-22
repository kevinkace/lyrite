import { get } from "object-path";

import state from "../../state";

import css from "./index.css";
import logo from "../../icons/lyrite-logo2.svg";

import animResolve from "animation-resolve";

export default {
    oncreate({ dom }) {
        state.header = {
            height : dom.offsetHeight
        };
    },
    onbeforeremove({ dom }) {
        return animResolve(dom, css.headerOut);
    },
    onremove() {
        // todo: should be in an action
        delete state.header;
    },
    view() {
        const title = get(state, [ "song", "data", "title" ]);

        return m("div", { class : css.headerIn },
            m("h1", { class : css.title }, title),

            m("div", { class : css.logo },
                m("a", {
                        href     : "/",
                        oncreate : m.route.link,
                    },
                    m.trust(logo),
                    m("div", "Lyrite")
                )
            )
        );
    }
};
