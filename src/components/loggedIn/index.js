import state from "../../state";

import css from "./index.css";

export default {
    oninit(vnode) {
        vnode.state.boundHandler = vnode.state.handler.bind(this);
    },

    handler() {
        this.expand = false;
        m.redraw();
    },

    // Close logged in panel when clicking outside panel
    handleHandler() {
        if (!this.expand && this.attached) {
            document.removeEventListener("click", this.boundHandler);
            this.attached = false;
        }

        if (this.expand && !this.attached) {
            this.attached = true;
            document.addEventListener("click", this.boundHandler);
        }
    },

    view(vnode) {
        const { expand } = vnode.state;
        const { username, photoURL } = state.session;

        vnode.state.handleHandler();

        return m("div", { class : css.user },
            m("button", {
                    class        : expand ? css.hideChev : "",
                    "aria-label" : "profile settings",
                    onclick(e) {
                        e.preventDefault();

                        vnode.state.expand = !expand;
                    }
                },
                m("img", {
                    src : photoURL,
                    alt : `${username} avatar`
                })
            ),

            m("div", {
                    class : css.panel,
                    style : {
                        maxHeight : expand ? `${vnode.state.height + 10}px` : 0,
                        transform : expand ? "translateY(0)" : "translateY(-0.6em)"
                    }
                },
                m("div", {
                        oncreate({ dom }) {
                            vnode.state.height = dom.offsetHeight + 10;
                        }
                    },
                    m("div", { class : css.signedIn },
                        "signed in as ",
                        m("span", { class : css.username }, username)
                    ),

                    m("hr"),

                    m("a", {
                        href : `/users/${username}`,
                        oncreate : m.route.link
                    }, "my songs"),

                    m("button", {
                            class : css.logout,
                            onclick() {
                                state.action("LOGOUT").then(m.redraw);
                            }
                        },
                        "logout"
                    )
                )
            )
        );
    }
};
