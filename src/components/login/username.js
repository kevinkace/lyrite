import state from "../../state";

import cssJoin from "cssJoin";
import css from "./username.css";
import error from "../error";
import loading from "../loading";
import { pushError, validateForm } from "../../lib/form";

import submitSvg from "../../icons/submit.svg";

let formDom,
    formErrors = {};

export default {
    oninit(vnode) {
        vnode.state.value = "";
    },
    view(vnode) {
        const visibleErrors = vnode.state.showErrors && formErrors.username;

        const { tabindex } = vnode.attrs;

        return [
            m("form", {
                    class : cssJoin(
                        [ visibleErrors, css.usernameErrors, css.username ],
                        [ vnode.state.disabled, css.formDisabled, css.form ]
                    ),
                    novalidate : true,
                    oncreate(formVnode) {
                        formDom = formVnode.dom;
                        validateForm(formDom, formErrors);
                    },
                    onsubmit(e) {
                        if (e) {
                            e.preventDefault();
                        }

                        if (vnode.state.disabled) {
                            return;
                        }

                        // always show errors after attempting submit once
                        vnode.state.showErrors = true;

                        validateForm(formDom, formErrors);

                        // errors will be shown, don't submit
                        if (Object.keys(formErrors).length) {
                            return;
                        }

                        vnode.state.disabled = true;

                        state.action("ADD_USERNAME", vnode.state.value)
                            .catch(err => {
                                vnode.state.value = "";
                                delete vnode.state.disabled;
                            })
                            .finally(m.redraw);
                    }
                },

                m("label",

                    m("input", {
                        tabindex,
                        class     : vnode.state.value.length ? "focus" : null,
                        name      : "username",
                        type      : "text",
                        disabled  : vnode.state.disabled,
                        minlength : 1,
                        maxlength : 30,
                        required  : true,
                        pattern   : "[\\w\\-]*",
                        value     : vnode.state.value,
                        oninput   : m.withAttr("value", (value) => {
                            vnode.state.value = value;

                            validateForm(formDom, formErrors);
                        }),
                        onfocus() {
                            delete vnode.state.showErrors;
                        }
                    }),

                    m("span", { class : "placeholder" }, "Username")
                ),

                m("button", {
                    tabindex : 3,
                    type     : "submit",
                    class    : css.button,
                    disabled : vnode.state.disabled,

                    "aria-label" : "submit"
                }, m.trust(submitSvg)),

                m(error, {
                    show   : vnode.state.showErrors,
                    errors : formErrors.username,
                    align  : "bottom",
                    // valign : "bottom",
                    labels : {
                        all    : "1-30 characters, letters, numbers,  -",
                        unique : "usernames must be unique <br>please try something else"
                    }
                })
            )
        ];
    }
};
