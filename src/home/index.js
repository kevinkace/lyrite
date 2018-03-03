import m from "mithril";

import state from "../state";

import css from "./index.css";

import logo from "../icons/lyrite-logo.svg";

export default {
    view : (vnode) => [
        m("div", { class : css.home },

            m("div", { class : css.logoAndType },
                m.trust(logo),

                m("div", { class : css.logoType },
                    m("h1", { class : css.title }, state.appName),
                    m("h2", { class : css.subTitle }, "a tool to format lyrics")
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
                                let slug = state.action("LOAD SONG", vnode.state.lyricsValue);

                                delete vnode.state.textarea;
                                delete vnode.state.load;

                                return m.route.set(slug);
                            }
                        }, "load song")
                    ) :
                    null
            ),

            // loaded songs list
            m("div", { class : css.list },
                m("h3", "or choose a song"),
                state.songs ? state.songs.map((song, idx) =>
                    m("a", {
                            onclick : () => {
                                console.log("open song");
                                state.action("OPEN SONG", idx);
                            },
                            oncreate: m.route.link,
                            href : `/${song.slug}`
                        },
                        song.title,
                        song.artist ?
                            m("span", " - ", song.artist ) :
                            null
                    )
                ) : null
            )
        )
    ]
};
