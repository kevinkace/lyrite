import m from "mithril";
import { get } from "object-path";

import state from "../../state";

import css from "./list.css";

import animResolve from "../../lib/animResolve";

export default {
    view(vnode) {
        const songs = get(state, [ "songs", "songs" ]) || [];

        return m("div", { class : css.list },
            songs
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
                )
        );
    }
};
