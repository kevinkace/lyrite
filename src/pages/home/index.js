import state from "../../state";

import { get } from "object-path";

import css from "./index.css";

import logo from "../../icons/lyrite-logo2.svg";
import list from "../../components/list";
import songForm from "./songForm";
import tabs from "../../components/tabs";
import providers from "../../components/login/providers";

import newIcon from "../../icons/new.svg";
import addIcon from "../../icons/plus.svg";

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

                m(tabs, {
                        tabs : [
                            "newest lyrics",
                            {
                                icon  : addIcon,
                                label : "add lyrics"
                            }
                        ]
                    },

                    m(list, { songs : get(state, [ "songs", "songs" ]) }),

                    state.session.loggedIn ?
                        m(songForm) :
                        m("div", { class : css.providers },
                            m("h3", "sign in to add a song"),
                            m("div",
                                m(providers)
                            )
                        )
                )
            )
        ];
    }
};
