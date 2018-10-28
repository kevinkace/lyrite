import state from "../../state";

import css from "./username.css";
import error from "../error";
import loading from "../loading";

let formDom,
    formErrors = {};

function pushError(errors, name, type) {
    errors[name] = errors[name] || [];
    errors[name].push(type);

    return errors;
}

function validateForm(form, errors) {
    // clear all errors
    for (let key in errors) {
        delete errors[key];
    }

    // form is valid
    if (form.checkValidity()) {
        return true;
    }

    // iterate through form elements
    [].forEach.call(form.elements, (el) => {
        if (!el.name) {
            // only validate fields with a name attr
            return;
        }

        for (let type in el.validity) {
            if (!el.validity[type]) {
                continue;
            }

            pushError(errors, el.name, type);
        }
    });

    return false;
}

export default {
    manditory : true,
    view(vnode) {
        const visibleErrors = (vnode.state.showErrors && formErrors.username) || vnode.state.loading;

        return m("div", { class : visibleErrors ? css.usernameErrors : css.username },

            m("form", {
                    class      : vnode.state.disabled ? css.formDisabled : css.form,
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

                        vnode.state.disabled = true;

                        // always show errors after attempting submit once
                        vnode.state.showErrors = true;

                        validateForm(formDom, formErrors);

                        // errors will be shown, don't submit
                        if (Object.keys(formErrors).length) {
                            return;
                        }

                        vnode.state.loading = true;

                        state.action("TRY_ADD_USERNAME", vnode.state.value)
                            .catch(err => {
                                delete vnode.state.disabled;
                                delete vnode.state.loading;
                                pushError(formErrors, "username", err.message);
                                m.redraw();
                            });
                    }
                },

                m("label",
                    "Choose a user name",

                    m("br"),

                    m("input", {
                        name      : "username",
                        type      : "text",
                        disabled  : vnode.state.disabled,
                        minlength : 4,
                        maxlength : 30,
                        required  : true,
                        pattern   : "[\\w\\-]*",
                        value     : vnode.state.value,
                        oninput   : m.withAttr("value", (value) => {
                            vnode.state.value = value;

                            validateForm(formDom, formErrors);
                        })
                    })
                ),

                m("button", {
                    type     : "submit",
                    class    : css.button,
                    disabled : vnode.state.disabled
                }, "submit"),

                vnode.state.loading ? m(loading, { width : "full", valign : "bottom" }) : null,

                m(error, {
                    show   : vnode.state.showErrors,
                    errors : formErrors.username,
                    align  : "left",
                    valign : "bottom",
                    labels : {
                        all    : "must be 4-30 characters <br>allowed characters: letters, numbers,  -",
                        unique : "usernames must be unique <br>please try something else"
                    }
                })
            )
        );
    }
};
