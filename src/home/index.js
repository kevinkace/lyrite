import m from "mithril";

import state from "../state";

import css from "./index.css";

export default {
    view : (vnode) =>
        m("div", { class : css.home },

            // load button
            m("button", {
                class   : css.load,
                onclick : () => {
                    vnode.state.load = true;
                }
            }, "load song"),

            // textarea
            vnode.state.load ? [
                    m("textarea", {
                        oncreate : (textVnode) => {
                            vnode.state.textarea = textVnode;
                        },
                        class : css.textarea,
                        placeholder : "past song lyrics"
                    }),
                    m("button", {
                        class : css.loadText,
                        onclick : () => {
                            state.action("LOAD SONG", vnode.state.textarea.dom.value);
                            delete vnode.state.textarea;
                            delete vnode.state.load;
                        }
                    }, "load songs text")
                ] :
                null,

            // loaded songs list
            m("div", { class : css.list },
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
