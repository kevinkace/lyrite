import m from "mithril";

import state from "../../state";
import db from "../../state/db";

import css from "./index.css";

import logo from "../icons/lyrite-logo.svg";
import list from "./list";

export default {
    oninit : (vnode) => {
        vnode.state.defaultSongs = db.get("songs?default=true");
        vnode.state.customSongs = db.get("songs?default=undefined");
    },
    view : (vnode) => [
        m("div", { class : css.home },

            m("div", { class : css.logoAndType },
                m.trust(logo),

                m("div", { class : css.logoType },
                    m("h1", { class : css.title }, state.appName),
                    m("h2", { class : css.subTitle }, state.tagline)
                )
            ),

            m("div", { class : css.center },
                m("div", { class : css.dash },
                    m("textarea", {
                        class       : vnode.state.focused ? css.textareaFocused : css.textarea,
                        value       : vnode.state.lyricsValue,
                        placeholder : vnode.state.hidePlaceholder ? "" : "paste or drop lyrics",
                        onfocus : () => {
                            vnode.state.focused = true;
                            vnode.state.hidePlaceholder = true;
                        },
                        onblur : () => {
                            vnode.state.hidePlaceholder = false;
                        },
                        oninput : m.withAttr("value", (v) => {
                            vnode.state.lyricsValue = v;
                            vnode.state.loadable = v.length;
                        })
                    })
                ),

                vnode.state.loadable ?
                    m("div", { class : css.btnWrap },
                        m("button", {
                            class : css.loadBtn,
                            onclick : () => {
                                let slug = state.action("IMPORT SONG LYRICS", vnode.state.lyricsValue);

                                delete vnode.state.textarea;
                                delete vnode.state.load;

                                return m.route.set(slug);
                            }
                        }, "load song")
                    ) :
                    null
            ),

            // loaded songs list
            vnode.state.customSongs ?
                m(list, { songs : vnode.state.customSongs, header : "your saved songs"}) :
                null,

            // loaded songs list
            vnode.state.defaultSongs ?
                m(list, { songs : vnode.state.defaultSongs, header : "or choose a song"}) :
                null
        )
    ]
};
