import m from "mithril";

import state from "../state";

import css from "./index.css";

export default {
    view : (vnode) =>
        m("div", { class : css.home },

            m("h1", { class : css.title }, state.appName),
            // load button

            m("div", { class : css.dash },
                m("textarea", {
                    class       : vnode.state.focused ? css.textareaFocused : css.textarea,
                    placeholder : vnode.state.hidePlaceholder ? "" : "paste or drop lyrics",
                    onfocus : () => {
                        vnode.state.focused = true;
                        vnode.state.hidePlaceholder = true;

                    },
                    onblur : () => {
                        vnode.state.placeholder = false;
                    },
                    onpaste     : (e) => {
                        vnode.state.focused = true;

                        if(e.clipboardData.getData("text/plain") !== "") {
                            vnode.state.loadable = true;
                        }
                    },
                    oncreate : (textareaVnode) => {
                        vnode.state.textarea = textareaVnode;
                    }
                })
            ),

            vnode.state.loadable ?
                m("div", { class : css.btnWrap },
                    m("button", {
                        class : css.loadBtn,
                        onclick : () => {
                            let slug = state.action("LOAD SONG", vnode.state.textarea.dom.value);

                            delete vnode.state.textarea;
                            delete vnode.state.load;

                            m.route.set(slug);
                        }
                    }, "load song")
                ) :
                null,

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
                    }, song.title)
                ) : null
            )
        )
};
