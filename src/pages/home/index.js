import m from "mithril";

import state from "../../state";

import css from "./index.css";

import logo from "../../icons/lyrite-logo2.svg";
import list from "./list";

export default {

    oninit(vnode) {
        vnode.state.focused = "";
    },

    view(vnode) {
        const loading = !state.songs || state.songs.loading;

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

                // text input
                m("div", { class : css.center },

                    // title input
                    m("div", { class : vnode.state.focused === vnode.state.titleDom ? css.titleFocused : css.title },
                        m("input", {
                            value       : vnode.state.title,
                            placeholder : vnode.state.focused === vnode.state.titleDom ? "" : "Song Title",

                            oncreate : (titleVnode) => {
                                vnode.state.titleDom = titleVnode.dom;
                            },

                            onfocus : (e) => {
                                vnode.state.focused = e.currentTarget;
                            },
                            onblur : (e) => {
                                if(vnode.state.focused === e.currentTarget) {
                                    delete vnode.state.focused;
                                }
                            }
                        })
                    ),

                    // artist input
                    m("div", { class : vnode.state.focused === vnode.state.artistDom ? css.titleFocused : css.title },
                        m("input", {
                            value       : vnode.state.title,
                            placeholder : vnode.state.focused === vnode.state.artistDom ? "" : "Artist",

                            oncreate : (artistVnode) => {
                                vnode.state.artistDom = artistVnode.dom;
                            },

                            onfocus : (e) => {
                                vnode.state.focused = e.currentTarget;
                            },
                            onblur : (e) => {
                                if(vnode.state.focused === e.currentTarget) {
                                    delete vnode.state.focused;
                                }
                            }
                        })
                    ),

                    // lyrics input
                    m("div", { class : css.dash },
                        m("textarea", {
                            class       : vnode.state.focused === vnode.state.lyricsDom ? css.textareaFocused : css.textarea,
                            value       : vnode.state.lyricString,
                            placeholder : vnode.state.focused === vnode.state.lyricsDom ? "" : "paste or drop lyrics",

                            oncreate : (lyricsVnode) => {
                                vnode.state.lyricsDom = lyricsVnode.dom;
                            },

                            onfocus : (e) => {
                                vnode.state.focused = e.currentTarget;
                            },
                            onblur : (e) => {
                                if(vnode.state.focused === e.currentTarget) {
                                    delete vnode.state.focused;
                                }
                            },
                            oninput : m.withAttr("value", (v) => {
                                vnode.state.lyricString = v;
                                vnode.state.loadable = v.length;
                            })
                        })
                    ),

                    // load button
                    vnode.state.loadable ?
                        m("div", { class : css.btnWrap },
                            m("button", {
                                class : css.loadBtn,
                                onclick : () => {
                                    let slug = state.action("IMPORT SONG LYRICS", {
                                        lyricString : vnode.state.lyricString,
                                        userSong    : true
                                    });

                                    delete vnode.state.textarea;
                                    delete vnode.state.load;

                                    return m.route.set(slug);
                                }
                            }, "load song")
                        ) :
                        null
                ),

                m(list, { header : "all songs" })

            )
        ];
    }
};
