import state from "../../state";

import { get } from "object-path";

import css from "./list.css";
import animResolve from "animation-resolve";
import loading from "../../components/loading";

import createdByCurrentUser from "../../lib/createdByCurrentUser";

export default {
    view() {
        const songs = get(state, [ "songs", "songs" ]);

        return m("ul", { class : css.list },
            songs ?

                songs
                .filter((song) => !song.data.deleted_at)
                .map((song) =>
                    m("li", {
                            key   : song.id,
                            class : get(state, [ "deleted", song.id ]) ? css.deleted : null,

                            onbeforeremove(songVnode) {
                                return animResolve(songVnode.dom, css.songOut);
                            }
                        },
                        m("a", {
                                oncreate : m.route.link,
                                href     : `/songs/${song.data.slug}`
                            },
                            m("strong", song.data.title),

                            song.data.artist ?
                                ` - ${song.data.artist}` :
                                null
                        ),

                        createdByCurrentUser(song) ?
                            m("button", {
                                onclick() {
                                    state.action("DELETE_SONG_BY_ID", song.id);
                                },
                                "aria-label" : "delete"
                            }, "🗙") :
                            null
                    )
                ) :

                m(loading, { text : true })
        );
    }
};
