import m from "mithril";
import { get } from "object-path";

import state from "../../state";

import css from "./list.css";

export default {
    oninit(vnode) {
        vnode.state.disabled = {};
    },
    view(vnode) {
        const va = vnode.attrs;
        const vs = vnode.state;

        return m("div", { class : css.list },
            m("h3", va.header),

            get(state, [ "songs", "songs" ]) ?
                state.songs.songs.map((song) =>
                    m("div", { key : song.id },
                        m("a", {
                                oncreate : m.route.link,
                                href     : `/songs/${song.data.slug}`
                            },
                            m("strong", song.data.title),

                            song.data.artist ?
                                [ " - ", song.data.artist ] :
                                null
                        ),

                        m("button", {
                            onclick : () => {
                                if(vs.disabled[song.id]) {
                                    return;
                                }

                                state.action("DELETE SONG BY ID", song.id);
                                vs.disabled[song.id] = true;
                            },
                            "aria-label" : "delete"
                        }, "🗙")
                    )
                ) :
                null
        );
    }
};
