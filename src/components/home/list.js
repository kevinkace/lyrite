import m from "mithril";

import state from "../../state";

import css from "./list.mcss";

export default {
    view(vnode) {
        return m("div", { class : css.list },
            m("h3", vnode.attrs.header),

            Object.keys(vnode.attrs.songs).map((slug) =>
                m("div",
                    m(m.route.Link, { href : `/${vnode.attrs.songs[slug].slug}` },
                        m("strong", vnode.attrs.songs[slug].title),

                        vnode.attrs.songs[slug].artist ?
                            [ " - ", vnode.attrs.songs[slug].artist ] :
                            null
                    ),
                    vnode.attrs.songs[slug].userSong ?
                        m("button", {
                            "aria-label" : "delete",

                            onclick() {
                                state.action("DELETE SONG BY SLUG", slug);
                            }
                        }, "🗙") :
                        null
                )
            )
        );
    }
};
