import m from "mithril";

import state from "../../state";

import css from "./list.css";

export default {
    view : (vnode) =>
        m("div", { class : css.list },
            m("h3", vnode.attrs.header),

            Object.keys(vnode.attrs.songs).map((id) =>
                m("div",
                    m("a", {
                            oncreate : m.route.link,
                            href     : `/songs/${vnode.attrs.songs[id].slug}`
                        },
                        m("strong", vnode.attrs.songs[id].title),

                        vnode.attrs.songs[id].artist ?
                            [ " - ", vnode.attrs.songs[id].artist ] :
                            null
                    ),
                    vnode.attrs.songs[id].userSong ?
                        m("button", {
                            onclick : () => {
                                state.action("DELETE SONG BY SLUG", id);
                            },
                            "aria-label" : "delete"
                        }, "🗙") :
                        null
                )
            )
        )
};
