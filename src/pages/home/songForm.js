import { get } from "object-path";

import state from "../../state";

import css from "./songForm.css";
import error from "../../components/error";

import { validateForm, pushError } from "../../lib/form";

let formDom,
    submitDom,
    disabled,
    showErrors,
    loading,
    formErrors = {},
    formState  = {};

window.formErrors = formErrors;

function onsubmit(e) {
    if (e) {
        e.preventDefault();
    }

    if (disabled) {
        return;
    }

    submitDom.focus();

    disabled = true;

    // always show errors after attempting submit
    showErrors = true;

    validateForm(formDom, formErrors);

    // errors will be shown, don't submit
    if (Object.keys(formErrors).length) {
        disabled = false;

        return;
    }

    loading = true;

    state.action("IMPORT_SONG_LYRICS", formState)
        .then(({ slug, id }) => {
            m.route.set(`/songs/${slug}-${id}`);
        })
        .catch(err => {
            console.error(err);

            disabled = false;
            loading = false;
            pushError(formErrors, "firebase", err);
            m.redraw();
        });
}

export default {
    oninit(vnode) {
        const vs = vnode.state;

        disabled = false;
        loading = false;
        showErrors = false;

        vs.focused = "";
        formState.title   = "";
        formState.artist  = "";
        formState.lyrics  = "";

        vs.isFocused = function(dom, trueResult = true, falseResult = false) {
            return vs.focused === dom ? trueResult : falseResult;
        };
    },

    view(vnode) {
        const vs = vnode.state;
        const {
            isFocused, focused,
            titleDom, artistDom, lyricsDom,
        } = vnode.state;
        const { title, artist, lyrics } = formState;

        return m("form", {
                class      : css.songForm,
                novalidate : true,

                oncreate({ dom }) {
                    formDom = dom;
                    validateForm(formDom, formErrors);
                },
                onsubmit
            },

            // title input
            m("label", { class : isFocused(titleDom, css.titleFocused, css.title) },
                m(error, {
                    show   : showErrors && !isFocused(titleDom),
                    errors : formErrors.title,
                    labels : {
                        all : "title must be 1-50 characters"
                    }
                }),

                m("input", {
                    class     : title ? "focus" : "",
                    value     : title,
                    minlength : 1,
                    maxlength : 50,
                    disabled,
                    required  : true,
                    name      : "title",

                    oncreate({ dom }) {
                        vs.titleDom = dom;
                    },

                    onfocus(e) {
                        vs.focused = e.currentTarget;
                    },

                    onblur(e) {
                        if (focused === e.currentTarget) {
                            delete vs.focused;
                        }
                    },

                    oninput : m.withAttr("value", (value) => {
                        formState.title = value;
                        validateForm(formDom, formErrors);
                    })
                }),

                m("div", { class : "placeholder" },
                    "Song title"
                )
            ),

            // artist input
            m("label", { class : isFocused(artistDom, css.artistFocused, css.artist) },
                m(error, {
                    show   : showErrors && !isFocused(artistDom),
                    errors : formErrors.artist,
                    labels : {
                        all : "artist name must be 1-50 characters"
                    }
                }),

                m("input", {
                    class     : artist ? "focus" : "",
                    value     : artist,
                    minlength : 1,
                    maxlength : 50,
                    disabled,
                    required  : true,
                    name      : "artist",

                    oncreate({ dom }) {
                        vs.artistDom = dom;
                    },

                    onfocus(e) {
                        vs.focused = e.currentTarget;
                    },

                    onblur(e) {
                        if (focused === e.currentTarget) {
                            delete vs.focused;
                        }
                    },

                    oninput : m.withAttr("value", (value) => {
                        formState.artist = value;
                        validateForm(formDom, formErrors);
                    })
                }),

                m("div", { class : "placeholder" }, "Artist")
            ),

            // lyrics input
            m("label", { class : css.dash },
                m(error, {
                    show   : showErrors && !isFocused(lyricsDom),
                    errors : formErrors.lyrics,
                    labels : {
                        all : "lyrics must be 10-5000 characters"
                    }
                }),

                m("textarea", {
                    class       : isFocused(lyricsDom, css.textareaFocused, css.textarea),
                    value       : lyrics,
                    placeholder : isFocused(lyricsDom, "", "paste or drop lyrics"),
                    minlength   : 10,
                    maxlength   : 5000,
                    disabled,
                    required    : true,
                    name        : "lyrics",

                    oncreate({ dom }) {
                        vs.lyricsDom = dom;
                    },

                    onfocus(e) {
                        vs.focused = e.currentTarget;
                    },

                    onblur(e) {
                        if (focused === e.currentTarget) {
                            delete vs.focused;
                        }
                    },

                    oninput : m.withAttr("value", (value) => {
                        formState.lyrics = value;
                        validateForm(formDom, formErrors);
                    }),

                    onkeydown(e) {
                        if (e.key === "Enter" && e.ctrlKey) {
                            onsubmit();
                        }
                    }
                })
            ),

            // load button
            m("div", { class : css.btnWrap },
                m("button", {
                    disabled,
                    class : css.loadBtn,
                    type  : "submit",
                    oncreate({ dom }) {
                        submitDom = dom;
                    }
                }, "load song")
            )
        );
    }
};
