import state from "../../state";

import css from "./username.css";
import error from "../error";

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
    view(vnode) {
        return m("div", { class : css.username },

            m("form", {
                    novalidate : true,
                    oncreate(formVnode) {
                        formDom = formVnode.dom;
                        validateForm(formDom, formErrors);
                    },
                    onsubmit(e) {
                        if (e) {
                            e.preventDefault();
                        }

                        vnode.state.showErrors = true;

                        validateForm(formDom, formErrors);

                        if (Object.keys(formErrors).length) {
                            console.error("errors");

                            return;
                        }

                        console.log("submit");

                        state.action("TRY_ADD_USERNAME", vnode.state.value);
                    }
                },


                m("label",
                    "Choose a user name",

                    m("br"),

                    m("input", {
                        name      : "username",
                        type      : "text",
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
                    type  : "submit",
                    class : css.button
                }, "submit"),

                m(error, {
                    show   : vnode.state.showErrors,
                    errors : formErrors.username,
                    labels : {
                        all    : "must be 4-30 characters, using only letters, numbers, and -",
                        unique : "must be unique, please try a variation"
                    }
                })
            )
        );
    }
};
