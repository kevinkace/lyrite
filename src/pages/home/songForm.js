import { get } from "object-path";

import state from "../../state";

import css from "./songForm.css";
import error from "./error";

import validator from "../../lib/validator";
import { songSchema } from "../../lib/schemas";

export default {
    oninit(vnode) {
        const vs = vnode.state;

        vs.focused = "";
        vs.title   = "";
        vs.artist  = "";
        vs.lyrics  = "";

        vs.validate = validator(vs, songSchema);
        vs.validationResults = vs.validate();

        vs.isFocused = function(dom, trueResult, falseResult) {
            return vs.focused === dom ? trueResult : falseResult;
        };
    },

    view(vnode) {
        const vs = vnode.state;
        const {
            onsubmit, isFocused, focused, validate,
            titleDom, showTitleError, title,
            artistDom, showArtistError, artist,
            lyricsDom, showLyricsError, lyrics,
        } = vnode.state;

        return m("form", {
                class    : css.center,
                onsubmit : (e) => {
                    e.preventDefault();

                    vs.validationResults = vs.validate();

                    if(vs.validationResults.errors) {
                        return;
                    }

                    state.action("IMPORT SONG LYRICS", vs)
                        .then((song) => {
                            m.route.set(`/songs/${song.slug}`);
                        });
                }
            },

            // title input
            m("div", { class : isFocused(titleDom, css.titleFocused, css.title) },
                m(error, {
                    show   : showTitleError,
                    errors : get(vs, [ "validationResults", "errors", "title" ])
                }),
                m("input", {
                    value       : title,
                    placeholder : isFocused(titleDom, "", "Song Title"),

                    oncreate : (titleVnode) => {
                        vs.titleDom = titleVnode.dom;
                    },

                    onfocus : (e) => {
                        vs.focused = e.currentTarget;
                    },
                    onblur : (e) => {
                        if(focused === e.currentTarget) {
                            delete vs.focused;
                        }

                        vs.showTitleError = true;
                    },
                    oninput : m.withAttr("value", (v) => {
                        vs.title = v;
                        vs.validationResults = validate();
                    })
                })
            ),

            // artist input
            m("div", { class : isFocused(artistDom, css.artistFocused, css.artist) },
                m(error, {
                    show   : showArtistError,
                    errors : get(vs, [ "validationResults", "errors", "artist" ])
                }),
                m("input", {
                    value       : artist,
                    placeholder : isFocused(artistDom, "", "Artist"),

                    oncreate : (artistVnode) => {
                        vs.artistDom = artistVnode.dom;
                    },

                    onfocus : (e) => {
                        vs.focused = e.currentTarget;
                    },
                    onblur : (e) => {
                        if(focused === e.currentTarget) {
                            delete vs.focused;
                        }

                        vs.showArtistError = true;
                    },
                    oninput : m.withAttr("value", (v) => {
                        vs.artist = v;
                        vs.validationResults = validate();
                    })
                })
            ),

            // lyrics input
            m("div", { class : css.dash },
                m(error, {
                    show   : showLyricsError,
                    errors : get(vs, [ "validationResults", "errors", "lyrics" ])
                }),
                m("textarea", {
                    class       : isFocused(lyricsDom, css.textareaFocused, css.textarea),
                    value       : lyrics,
                    placeholder : isFocused(lyricsDom, "", "paste or drop lyrics"),

                    oncreate : (lyricsVnode) => {
                        vs.lyricsDom = lyricsVnode.dom;
                    },

                    onfocus : (e) => {
                        vs.focused = e.currentTarget;
                    },
                    onblur : (e) => {
                        if(focused === e.currentTarget) {
                            delete vs.focused;
                        }

                        vs.showLyricsError = true;
                    },
                    oninput : m.withAttr("value", (v) => {
                        vs.lyrics = v;
                        vs.validationResults = validate();
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
        );
    }
};
