import { get } from "object-path";

import state from "../../state";

import css from "./list.css";
import animResolve from "../../lib/animResolve";
import loader from "../../components/loader";

function createdByUser(song) {
    return state.session && song.data.created_by && song.data.created_by.id === state.session.uid;
}

export default {
    view() {
        const songs = get(state, [ "songs", "songs" ]);

        return m("div", { class : css.list },
            songs ?

                songs
                .filter((song) => !song.data.deleted_at)
                .map((song) =>
                    m("div", {
                            key : song.id,

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

                m("div", {
                        class : css.loader,
                        onbeforeremove(loaderVnode) {
                            return animResolve(loaderVnode.dom, css.loaderFade);
                        }
                    },
                    "loading",
                    m(loader)
                )
        );
    }
};
