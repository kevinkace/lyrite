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
        const { username, photoURL } = state.session;

        vnode.state.handleHandler();

        return m("div", { class : css.user },
            m("button", {
                    "aria-label" : "profile settings",
                    onclick(e) {
                        e.preventDefault();

                        vnode.state.expand = !vnode.state.expand;
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
                        maxHeight : vnode.state.expand ? `${vnode.state.height + 10}px` : 0
                    }
                },
                m("div", {
                        oncreate({ dom }) {
                            vnode.state.height = dom.offsetHeight;
                        }
                    },
                    m("div", { class : css.username }, `signed in as ${username}`),

                    m("hr"),

                    m("a", { href : `/users/${username}` }, "my songs"),

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
