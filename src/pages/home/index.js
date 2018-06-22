import m from "mithril";
import { get } from "object-path";

import state from "../../state";
import validator from "../../lib/validator";
import { songSchema } from "../../lib/schemas";

import css from "./index.css";

import logo from "../../icons/lyrite-logo2.svg";
import list from "./list";

export default {
    oninit(vnode) {
        vnode.state.focused = "";
        vnode.state.validate = validator(vnode.state, songSchema);

        vnode.state.validationResults = vnode.state.validate();

        vnode.state.onsubmit = (e) => {
            e.preventDefault();

            vnode.state.validationResults = vnode.state.validate();

            if(vnode.state.validationResults.errors) {
                return;
            }

            state.action("IMPORT SONG LYRICS", vnode.state)
                .then((song) => {
                    m.route.set(`/songs/${song.slug}`);
                });
        };
    },

    view(vnode) {
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

                m("form", {
                        class : css.center,
                        onsubmit : vnode.state.onsubmit
                    },

                    // title input
                    m("div", { class : vnode.state.focused === vnode.state.titleDom ? css.titleFocused : css.title },
                        vnode.state.showTitleError && get(vnode.state, [ "validationResults", "errors", "title" ]) ?
                            m("div", { class : css.error }, "dun goofed") :
                            null,
                        m("input", {
                            value       : vnode.state.title,
                            placeholder : vnode.state.focused === vnode.state.titleDom ? "" : "Song Title",

                            oncreate : (titleVnode) => {
                                vnode.state.titleDom = titleVnode.dom;
                            },

                            onfocus : (e) => {
                                vnode.state.focused = e.currentTarget;
                                delete vnode.state.showTitleError;
                            },
                            onblur : (e) => {
                                if(vnode.state.focused === e.currentTarget) {
                                    delete vnode.state.focused;
                                }

                                vnode.state.showTitleError = true;
                            },
                            oninput : m.withAttr("value", (v) => {
                                vnode.state.title = v;
                                vnode.state.validationResults = vnode.state.validate();
                            })
                        })
                    ),

                    // artist input
                    m("div", { class : vnode.state.focused === vnode.state.artistDom ? css.titleFocused : css.title },
                        m("input", {
                            value       : vnode.state.artist,
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
                            },
                            oninput : m.withAttr("value", (v) => {
                                vnode.state.artist = v;
                                vnode.state.validationResults = vnode.state.validate();
                            })
                        })
                    ),

                    // lyrics input
                    m("div", { class : css.dash },
                        m("textarea", {
                            class       : vnode.state.focused === vnode.state.lyricsDom ? css.textareaFocused : css.textarea,
                            value       : vnode.state.lyrics,
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
                                vnode.state.lyrics = v;
                                vnode.state.validationResults = vnode.state.validate();
                            })
                        })
                    ),

                    // load button
                    !get(vnode.state, [ "validationResults", "errors"]) ?
                        m("div", { class : css.btnWrap },
                            m("button", {
                                class : css.loadBtn,
                                type  : "submit"
                            }, "load song")
                        ) :
                        null
                ),

                m(list, { header : "all songs" })

            )
        ];
    }
};
