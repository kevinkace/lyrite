import m from "mithril";
import { get } from "object-path";

import state from "../../state";
import validator from "../../lib/validator";
import { songSchema } from "../../lib/schemas";

import css from "./index.css";

import logo from "../../icons/lyrite-logo2.svg";
import list from "./list";
import error from "./error";

export default {
    oninit(vnode) {
        const vs = vnode.state;

        vs.focused = "";
        vs.title = "";
        vs.artist = "";
        vs.lyrics = "";

        vs.validate = validator(vs, songSchema);
        vs.validationResults = vs.validate();

        vs.onsubmit = (e) => {
            e.preventDefault();

            vs.validationResults = vs.validate();

            if(vs.validationResults.errors) {
                return;
            }

            state.action("IMPORT SONG LYRICS", vs)
                .then((song) => {
                    m.route.set(`/songs/${song.slug}`);
                });
        };

        vs.isFocused = function(dom, trueResult, falseResult) {
            return vs.focused === dom ? trueResult : falseResult;
        };
    },

    view(vnode) {
        const vs = vnode.state;

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
                        class    : css.center,
                        onsubmit : vs.onsubmit
                    },

                    // title input
                    m("div", { class : vs.isFocused(vs.titleDom, css.titleFocused, css.title) },
                        m(error, {
                            show   : vs.showTitleError,
                            errors : get(vs, [ "validationResults", "errors", "title" ])
                        }),
                        m("input", {
                            value       : vs.title,
                            placeholder : vs.isFocused(vs.titleDom, "", "Song Title"),

                            oncreate : (titleVnode) => {
                                vs.titleDom = titleVnode.dom;
                            },

                            onfocus : (e) => {
                                vs.focused = e.currentTarget;
                            },
                            onblur : (e) => {
                                if(vs.focused === e.currentTarget) {
                                    delete vs.focused;
                                }

                                vs.showTitleError = true;
                            },
                            oninput : m.withAttr("value", (v) => {
                                vs.title = v;
                                vs.validationResults = vs.validate();
                            })
                        })
                    ),

                    // artist input
                    m("div", { class : vs.isFocused(vs.artistDom, css.titleFocused, css.title) },
                        m(error, {
                            show   : vs.showArtistError,
                            errors : get(vs, [ "validationResults", "errors", "artist" ])
                        }),
                        m("input", {
                            value       : vs.artist,
                            placeholder : vs.isFocused(vs.artistDom, "", "Artist"),

                            oncreate : (artistVnode) => {
                                vs.artistDom = artistVnode.dom;
                            },

                            onfocus : (e) => {
                                vs.focused = e.currentTarget;
                            },
                            onblur : (e) => {
                                if(vs.focused === e.currentTarget) {
                                    delete vs.focused;
                                }

                                vs.showArtistError = true;
                            },
                            oninput : m.withAttr("value", (v) => {
                                vs.artist = v;
                                vs.validationResults = vs.validate();
                            })
                        })
                    ),

                    // lyrics input
                    m("div", { class : css.dash },
                        m(error, {
                            show   : vs.showLyricsError,
                            errors : get(vs, [ "validationResults", "errors", "lyrics" ])
                        }),
                        m("textarea", {
                            class       : vs.isFocused(vs.lyricsDom, css.textareaFocused, css.textarea),
                            value       : vs.lyrics,
                            placeholder : vs.isFocused(vs.lyricsDom, "", "paste or drop lyrics"),

                            oncreate : (lyricsVnode) => {
                                vs.lyricsDom = lyricsVnode.dom;
                            },

                            onfocus : (e) => {
                                vs.focused = e.currentTarget;
                            },
                            onblur : (e) => {
                                if(vs.focused === e.currentTarget) {
                                    delete vs.focused;
                                }

                                vs.showLyricsError = true;
                            },
                            oninput : m.withAttr("value", (v) => {
                                vs.lyrics = v;
                                vs.validationResults = vs.validate();
                            })
                        })
                    ),

                    // load button
                    !get(vs, [ "validationResults", "errors"]) ?
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
