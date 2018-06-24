import m from "mithril";
import { get } from "object-path";

import state from "../../state";

import css from "./list.css";

import animResolve from "../../lib/animResolve";

export default {
    view(vnode) {
        const va = vnode.attrs;

        return m("div", { class : css.list },
            m("h3", va.header),

            get(state, [ "songs", "songs" ]) ?
                state.songs.songs
                .filter((song) => !song.data.deleted_at)
                .map((song) =>
                    m("div", {
                            key : song.id,

                            onbeforeremove : (songVnode) =>
                                animResolve(songVnode.dom, css.songOut)
                        },
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
                                state.action("DELETE SONG BY ID", song.id);
                            },
                            "aria-label" : "delete"
                        }, "🗙")
                    )
                ) :
                null
        );
    }
};
