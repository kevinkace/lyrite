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
    manditory : true, // prevent modal from being closable
    oninit(vnode) {
        vnode.state.value = "";
    },
    view(vnode) {
        const visibleErrors = (vnode.state.showErrors && formErrors.username) || vnode.state.loading;

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

                        vnode.state.loading = true;
                        vnode.state.disabled = true;

                        state.action("GET_USERNAME_PROVIDERS", vnode.state.value)
                            .then(curProvider => {
                                // new user for username
                                if (!curProvider) {
                                    // username locked
                                    // show all providers

                                    return;
                                }

                                // show selected provider
                            })

                        // state.action("TRY_ADD_USERNAME", vnode.state.value)
                        //     .catch(err => {
                        //         delete vnode.state.disabled;
                        //         delete vnode.state.loading;
                        //         pushError(formErrors, "username", err.message);
                        //         m.redraw();
                        //     });
                    }
                },

                m("label",

                    m("input", {
                        class       : vnode.state.value.length ? "focus" : null,
                        name        : "username",
                        type        : "text",
                        disabled    : vnode.state.disabled,
                        minlength   : 4,
                        maxlength   : 30,
                        required    : true,
                        pattern     : "[\\w\\-]*",
                        value       : vnode.state.value,
                        // placeholder : "username",
                        oninput     : m.withAttr("value", (value) => {
                            vnode.state.value = value;

                            validateForm(formDom, formErrors);
                        }),
                        onfocus() {
                            delete vnode.state.showErrors;
                        }
                    }),

                    m("span", "Username")
                ),

                m("button", {
                    type     : "submit",
                    class    : css.button,
                    disabled : vnode.state.disabled,

                    "aria-label" : "submit"
                }, m.trust(submitSvg)),

                vnode.state.loading ? m(loading, { width : "full", valign : "bottom" }) : null,

                m(error, {
                    show   : vnode.state.showErrors,
                    errors : formErrors.username,
                    align  : "bottom",
                    // valign : "bottom",
                    labels : {
                        all    : "4-30 characters, letters, numbers,  -",
                        unique : "usernames must be unique <br>please try something else"
                    }
                })
            )
        ];
    }
};
