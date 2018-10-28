import state from "../../state";

import { get } from "object-path";

import css from "./list.css";
import animResolve from "animation-resolve";
import loading from "../../components/loading";

function createdByUser(song) {
    const uid = get(state, [ "session", "uid" ]);
    const createdBy = get(song, [ "data", "created_by" ]) || {}; // created_by is a firebase doc ref, and not really an obj so have to handle a little differently

    return uid && createdBy.id === uid;
}

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

                        createdByUser(song) ?
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
