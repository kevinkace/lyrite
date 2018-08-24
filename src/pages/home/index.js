import m from "mithril";

import state from "../../state";

import css from "./index.css";

import logo from "../../icons/lyrite-logo2.svg";
import list from "./list";
import songForm from "./songForm";
import tabs from "../../components/tabs";

export default {
    view() {
        return [
            m("div", { class : css.home },

                // logo etc
                m("div", { class : css.logoAndType },
                    m.trust(logo),

                    m("div", { class : css.logoType },
                        m("h1", { class : css.appName }, state.appName),
                        m("h2", { class : css.tagline }, state.tagline)
                    )
                ),

                m(tabs, { tabs : [ "newest songs", "add new song" ] },
                    m(list),

                    state.loggedIn ?
                        m(songForm) :
                        m("div", { class : css.providers },
                            m("button", "add your own song")
                        )
                )
            )
        ];
    }
};
