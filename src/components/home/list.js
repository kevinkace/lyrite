import m from "mithril";

import css from "./list.css";

export default {
    oninit : () => {
        console.log("test");
    },
    view : (vnode) =>
        m("div", { class : css.list },
            m("h3", vnode.attrs.header),

            Object.keys(vnode.attrs.songs).map((slug) =>
                m("a", {
                        oncreate : m.route.link,
                        href     : `/${vnode.attrs.songs[slug].slug}`
                    },
                    vnode.attrs.songs[slug].title,
                    vnode.attrs.songs[slug].artist ?
                        m("span", " - ", vnode.attrs.songs[slug].artist ) :
                        null
                )
            )
        )
};
